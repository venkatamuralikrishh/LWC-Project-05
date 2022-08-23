public with sharing class EmailService_OutBoundEmail_03 {
    
    //send email by attaching the word and pdf files
    public static void sendEmailWithAttachments(){

        //fetch the document and create EmailFileAttachment
        Document d = [SELECT Name,Body,ContentType from Document WHERE Name = 'Outbound email word file'];
        Messaging.EmailFileAttachment efa1 = new Messaging.EmailFileAttachment();
        efa1.setFileName(d.Name);
        efa1.setBody(d.body);
        efa1.setContentType(d.ContentType);

        //refer vf page and send as pdf attachment
        Pagereference p = Page.Outbound_Email_Test_Page;
        Blob body = p.getContentAsPdf();
        Messaging.EmailFileAttachment efa2 = new Messaging.EmailFileAttachment();
        efa2.setFileName('Test File.pdf');
        efa2.setBody(body);

        //add all attachments into list
        List<Messaging.EmailFileAttachment> attachments = new List<Messaging.EmailFileAttachment>{efa1,efa2};
        
        //query the lead records to send the mail by attaching the above documents
        List<Lead> leadList = [SELECT Id,lastName,firstName,Email,Phone from Lead WHERE CreatedDate = TODAY];
        List<Messaging.Email> mails = new List<Messaging.Email>();
        for(Lead l : leadList){
            List<String> toAdd = new List<String>{l.Email};
            Messaging.SingleEmailMessage email1 = new Messaging.SingleEmailMessage();
            email1.setToAddresses(toAdd);
            email1.setSubject('Lead Service Request');
            String body02 = '<h1>Dear Customer,<br/><br/>';
            body02 += 'Your service request is received with the following details <br/><br/>';
            body02 += 'LastName : '+ l.lastName + '<br/><br/>';
            body02 += 'FirstName : '+ l.firstName + '<br/><br/>';
            body02 += 'Phone : '+ l.Phone + '<br/><br/>';
            body02 += 'Email : '+ l.Email + '</h1>';
            email1.setHtmlBody(body02);
            email1.setSenderDisplayName('Lead Service Support Team');
            email1.setReplyTo('muralikrishh.sfdc@gmail.com');
            //add the attachments here
            email1.setFileAttachments(attachments);
            mails.add(email1);
        }
        Messaging.sendEmail(mails);
    }
}
