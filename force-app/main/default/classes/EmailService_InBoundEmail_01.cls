public with sharing class EmailService_InBoundEmail_01 implements Messaging.InboundEmailHandler{
    
    /**
     * If you want to handle the inbound email messages using apex, you should implement Messaging.InboundEmailHandler interface which contain method handleInboundEmail.
     * Messaging.InboundEmail contains methods like fromAddress, toAddress, subject, body, etc..
     * Messaging.InboundEnvelope contains only fromAddress, and toAddress
     * we should return the result whether apex inbound email is handled properly or not.
     * for that we need to use Messaging.InboundEmailResult which contains message, success methods 
     * 
     */
    public static Messaging.InboundEmailResult handleInboundEmail(Messaging.inboundEmail email,Messaging.InboundEnvelope env){
        Messaging.InboundEmailResult result = new Messaging.InboundEmailResult();
        String fromAdd = email.fromAddress;
        String body = email.plainTextBody;
        String subject = email.subject;
        Contact con = [SELECT Id, Name from Contact WHERE Email =: fromAdd ORDER BY CreatedDate Desc LIMIT 1];
        Case c = new Case();
        c.Subject = subject;
        c.Priority = 'High';
        c.Status = 'New';
        c.Origin = 'Email';
        c.Description = body;
        c.ContactId = con.Id;
        insert c;
        result.success = true;
        return result;
    }
}
