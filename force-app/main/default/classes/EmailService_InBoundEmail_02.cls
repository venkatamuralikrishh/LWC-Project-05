public with sharing class EmailService_InBoundEmail_02 implements Messaging.InboundEmailHandler{
    
    //handle the inbound email with attachments
    public static Messaging.InboundEmailResult handleInboundEmail(Messaging.inboundEmail email,Messaging.InboundEnvelope env){
        //initiate the result
        Messaging.InboundEmailResult result = new Messaging.InboundEmailResult();
        //get the attachments 
        List<Messaging.InboundEmail.BinaryAttachment> files = email.binaryAttachments;
        //create a contact
        Contact con = new Contact();
        con.LastName = email.fromName;
        con.Email = email.fromAddress;
        con.Description = email.plainTextBody;
        insert con;
        //create List<Attachment> to store the attachments in the database
        List<Attachment> attachments = new List<Attachment>();
        for(Messaging.InboundEmail.BinaryAttachment b : files){
            Attachment at = new Attachment();
            at.ParentId = con.Id;
            at.Body = b.body;
            at.Name = b.fileName;
            attachments.add(at);
        }
        insert attachments;
        //set the result true
        result.success = true;
        return result;
    }
}
