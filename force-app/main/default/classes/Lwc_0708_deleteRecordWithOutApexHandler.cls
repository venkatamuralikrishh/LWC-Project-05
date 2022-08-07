public with sharing class Lwc_0708_deleteRecordWithOutApexHandler {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        return [SELECT Id,Name from Account ORDER BY CreatedDate Desc LIMIT 5];
    }
}
