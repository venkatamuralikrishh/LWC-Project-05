public with sharing class EmailService_OutBoundEmail_01 {

    //send the outbound email to the leads which are created today
    public static void sendOutBoundEmail(){
        List<Lead> leadList = [SELECT Id,lastName,firstName,Email,Phone from Lead WHERE CreatedDate = TODAY];
        System.debug(leadList.size());
        System.debug(leadList);
        List<Messaging.Email> mails = new List<Messaging.Email>();
        for(Lead l : leadList){
            List<String> toAdd = new List<String>{l.Email};
            Messaging.SingleEmailMessage email1 = new Messaging.SingleEmailMessage();
            email1.setToAddresses(toAdd);
            email1.setSubject('Lead Service Request');
            String body = '<h1>Dear Customer,<br/><br/>';
            body += 'Your service request is received with the following details <br/><br/>';
            body += 'LastName : '+ l.lastName + '<br/><br/>';
            body += 'FirstName : '+ l.firstName + '<br/><br/>';
            body += 'Phone : '+ l.Phone + '<br/><br/>';
            body += 'Email : '+ l.Email + '<br/><br/>';
            body += 'Thanks & Regards <br/><br/>';
            body += 'Murali Krishna </h1>';
            email1.setHtmlBody(body);
            email1.setSenderDisplayName('Lead Service Support Team');
            email1.setReplyTo('muralikrishh.sfdc@gmail.com');
            mails.add(email1);
        }
        Messaging.sendEmail(mails);
    }
}
