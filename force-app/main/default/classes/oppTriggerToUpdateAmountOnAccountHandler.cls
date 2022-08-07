public with sharing class oppTriggerToUpdateAmountOnAccountHandler {
    /*
    trigger scenario:
    calculate all the child opportunities amount (which are having stage = 'closed won') and display value on the parent account record "Total Amount" field.
    1) on inserting a new opportunity with stage name ='closed won', add Amount to 'Total Amount' on account record
    2) on updating an existing opportunity : 
        if you change the amount value, Total Amount value on account should be modified.
        If you change the stagename from 'closed won' to any other stagename, Amount value should be substracted from 'Total Amount' from parent account.
        If you change the stagename from different value to 'closed won',  Amount value should be added to 'Total Amount' on account.
    3) on deleting an existing opportunity with stageName = 'closed won', Amount value should be substracted from 'Total Amount' from parent account.
    4) on un-deleting opportunity from recycle bin with stageName = 'closed won', Amount value should be added to 'Total Amount' on account.
    In a single trigger, you should write this code and dont write the 2 for-loops to achieve this. with less logic only you should achieve this.
    */

    public static void onAfterInsert(Map<Id, Opportunity> newMap){
        Map<Id,List<Opportunity>> accOppMap = new Map<Id,List<Opportunity>>();
        for(Opportunity op : newMap.values()){
            if(op.AccountId != null){
                List<Opportunity> oppList = new List<Opportunity>();
                oppList.add(op);
                accOppMap.put(op.AccountId, oppList);
            }
        }
        List<Account> accList = [SELECT Id,Total_Amount__c from Account WHERE ID IN : accOppMap.keySet()];
        Map<Account,List<Opportunity>> accOppMap01 = new Map<Account,List<Opportunity>>();
        for(Account acc : accList){
            List<Opportunity> oppList = new List<Opportunity>();
            oppList = accOppMap.get(acc.Id);
            accOppMap01.put(acc, oppList);
        }
        List<Account> accListToUpdate = new List<Account>();
        for(Account acc : accOppMap01.keySet()){
            for(Opportunity op : accOppMap01.get(acc)){
                if(op.StageName == 'Closed Won'){
                    acc.Total_Amount__c += op.Amount;
                }
            }         
            accListToUpdate.add(acc);
        }
        update accListToUpdate;
    }

    public static void onAfterUpdate(Map<Id, Opportunity> oldMap, Map<Id, Opportunity> newMap){
        Map<Id,List<Opportunity>> accOppMap = new Map<Id,List<Opportunity>>();
        for(Opportunity op : newMap.values()){
            if(((op.StageName != oldMap.get(op.Id).StageName) || 
                (op.Amount != oldMap.get(op.Id).Amount && op.StageName == oldMap.get(op.Id).StageName)) && 
                op.AccountId != null){
                List<Opportunity> oppList = new List<Opportunity>();
                oppList.add(op);
                accOppMap.put(op.AccountId, oppList);
            }
        }
        List<Account> accList = [SELECT Id,Total_Amount__c from Account WHERE ID IN : accOppMap.keySet()];
        Map<Account,List<Opportunity>> accOppMap01 = new Map<Account,List<Opportunity>>();
        for(Account acc : accList){
            List<Opportunity> oppList = new List<Opportunity>();
            oppList = accOppMap.get(acc.Id);
            accOppMap01.put(acc, oppList);
        }
        List<Account> accListToUpdate = new List<Account>();
        for(Account acc : accOppMap01.keySet()){
            for(Opportunity op : accOppMap01.get(acc)){
                if(op.StageName == 'Closed Won'){
                    if(op.Amount != oldMap.get(op.Id).Amount){
                        acc.Total_Amount__c -= oldMap.get(op.Id).Amount;
                    }
                    acc.Total_Amount__c += op.Amount;
                }
                if(op.StageName != 'Closed Won'){
                    if(op.Amount == oldMap.get(op.Id).Amount){
                        acc.Total_Amount__c -= op.Amount;
                    }
                }
            }         
            accListToUpdate.add(acc);
        }
        update accListToUpdate;
    }

    public static void onAfterDelete(Map<Id,Opportunity> oldMap){
        Map<Id,List<Opportunity>> oppOldMap = new Map<Id,List<Opportunity>>();
        for(Opportunity op : oldMap.values()){
            if(op.AccountId != null && op.StageName == 'Closed Won'){
                List<Opportunity> oppList = new List<Opportunity>();
                oppList.add(op);
                oppOldMap.put(op.AccountId, oppList);
            }
        }
        List<Account> accList = [SELECT Id,Total_Amount__c from Account WHERE ID IN : oppOldMap.keySet()];
        Map<Account,List<Opportunity>> accOppMap = new Map<Account,List<Opportunity>>();
        for(Account acc : accList){
            List<Opportunity> oppList = oppOldMap.get(acc.Id);
            accOppMap.put(acc, oppList);
        }
        List<Account> accListToUpdate = new List<Account>();
        for(Account acc : accOppMap.keySet()){
            for(Opportunity op : accOppMap.get(acc)){
                acc.Total_Amount__c -= op.Amount;
                accListToUpdate.add(acc);
            }
        }
        update accListToUpdate;
    }

    public static void onAfterUndelete(Map<Id,Opportunity> newMap){
        Map<Id,List<Opportunity>> oppNewMap = new Map<Id,List<Opportunity>>();
        for(Opportunity op : newMap.values()){
            if(op.AccountId != null && op.StageName == 'Closed Won'){
                List<Opportunity> oppList = new List<Opportunity>();
                oppList.add(op);
                oppNewMap.put(op.AccountId, oppList);
            }
        }
        List<Account> accList = [SELECT Id,Total_Amount__c from Account WHERE ID IN : oppNewMap.keySet()];
        Map<Account,List<Opportunity>> accOppMap = new Map<Account,List<Opportunity>>();
        for(Account acc : accList){
            List<Opportunity> oppList = oppNewMap.get(acc.Id);
            accOppMap.put(acc, oppList);
        }
        List<Account> accListToUpdate = new List<Account>();
        for(Account acc : accOppMap.keySet()){
            for(Opportunity op : accOppMap.get(acc)){
                acc.Total_Amount__c += op.Amount;
                accListToUpdate.add(acc);
            }
        }
        update accListToUpdate;
    }
}