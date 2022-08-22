public with sharing class AccountController {
    /*
    * Author:- Venkata Murali Krishna
    * Description:- This apex class is server side controller for LWC component (callApexClassWithWireProperty)
    * Created:- 25-June-2022
    * Last Updated:- 21-Aug-2022
    */

    //CallApexClassWithWireProperty02 Lwc component
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsByName(String nm){
        List<Account> accList = [SELECT Id,Name from Account WHERE Name LIKE :nm+'%' WITH SECURITY_ENFORCED];
        system.debug(accList);
        return accList;
        
    }

    //CallApexClassWithWireProperty Lwc component
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        List<Account> accList = [SELECT Id,Name from Account WITH SECURITY_ENFORCED];
        return accList;
        
    }

    //callApexMethodImperatively Lwc Component
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContactList(){
        List<Contact> conList = [SELECT Id,FirstName,LastName from Contact WITH SECURITY_ENFORCED];
        return conList;
        
    }

    //method used in Account Records pagination LWC component
    @AuraEnabled(cacheable=true)
    public static List<Account> retrieveAllAccounts(String sortedBy, String sortedDirection){
        String query = 'SELECT Id,Name,Type,BillingCountry,AnnualRevenue,Phone,isActive__c,SLAExpirationDate__c from Account';
        query += ' ORDER BY ' + sortedBy + ' ' + sortedDirection;
        return Database.query(query);
    }

    //method used in Account Records pagination LWC component
    @AuraEnabled
    public static String updateAccounts(Object obj){
        String jsonString = JSON.serialize(obj);
        List<Account> accList = (List<Account>)JSON.deserialize(jsonString, List<Account>.class);
        try{
            update accList;
            return 'Records Updated Successfully';
        }
        catch(Exception e){
            return 'The following exception has occurred: ' + e.getMessage();
        }
    }
}