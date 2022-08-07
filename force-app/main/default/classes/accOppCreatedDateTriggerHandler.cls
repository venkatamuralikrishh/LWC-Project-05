public with sharing class accOppCreatedDateTriggerHandler {
    
    //Write a trigger on the Account when the Account is updated check all opportunities related to the account. Update all Opportunities Stage to close lost if an opportunity created date is greater than 30 days from today and stage not equal to close won.

    public static void updateOpportunities(Map<Id,Account> oldMap, Map<Id,Account> newMap){
        //get the new records from newMap
        List<Account> newAcc = newMap.values();
        Set<Id> accIds = new Set<Id>();
        for(Account acc : newAcc){
            // check whether old name and new name is same or not, if not same collect all the account Id's and add it into a set
            if(acc.Name != oldMap.get(acc.Id).Name){
                accIds.add(acc.Id);
            }
        }
        //get all the related opportunities whose created date is less than 30 days from today
        List<Account> accNewList = [SELECT Id, (SELECT Id, StageName from Opportunities WHERE createdDate < LAST_N_DAYS:30), Name from Account WHERE ID IN : accIds];

        List<Opportunity> oppListToUpdate = new List<Opportunity>();

        for(Account acc : accNewList){
            for(Opportunity op : acc.Opportunities){
                if(op.StageName != 'closed won'){
                    op.StageName = 'closed lost';
                    oppListToUpdate.add(op);
                }
            }
        }
        List<Database.SaveResult> results = Database.update(oppListToUpdate);
        for(Database.SaveResult sr : results){
            if(sr.isSuccess()){
                System.debug('record id : '+sr.getId());
            }
            else{
                for(Database.Error er : sr.getErrors()){
                    System.debug('error message : '+er.getMessage());
                    System.debug('error fields : '+er.getFields());
                }
            }
        }
    }
}
