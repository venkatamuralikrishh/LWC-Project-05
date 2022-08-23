public with sharing class EmailService_OutBoundEmail_02 {
    
    //send emails to all the leads which are created today with Update_Lead_Details email template
    public static void sendEmailWithTemplate(){
        Map<Id,Lead> leadMap = new Map<Id,Lead>([SELECT Id,Name,Email from Lead WHERE CreatedDate = TODAY]);
        List<Id> ids = new List<Id>(leadMap.keySet());
        EmailTemplate et = [SELECT Id from EmailTemplate WHERE Name = 'Update_Lead_Details'];
        Messaging.MassEmailMessage emails = new Messaging.MassEmailMessage();
        emails.setTemplateId(et.Id);
        emails.setTargetObjectIds(ids); //250 targte object ids we can pass in massemailmessage
        List<Messaging.Email> sendEmails = new List<Messaging.Email>{emails};
        Messaging.sendEmail(sendEmails);
    }
}
