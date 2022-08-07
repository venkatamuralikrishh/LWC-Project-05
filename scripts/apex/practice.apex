/*
Opportunity opp = [SELECT Id,Name,AccountId,StageName,Amount from Opportunity WHERE name ='manasa'];
System.debug(opp);

Map<Id,Opportunity> oppMap = new Map<Id,Opportunity>();
oppMap.put(opp.Id, opp);

oppTriggerToUpdateAmountOnAccountHandler.onAfterInsert(oppMap);
*/
Map<Account,List<Opportunity>> accOppMap02 = new Map<Account,List<Opportunity>>();
List<Account> accList = [SELECT Id, (SELECT Id, stageName from Opportunities), Name from Account WHERE Name LIKE 'United%'];
    for(Account acc : accList){
        List<Opportunity> oppList = acc.Opportunities;
        accOppMap02.put(acc,oppList);
    }
    System.debug(accOppMap02);
    for(Account acc : accOppMap02.keySet()){
        for(Opportunity op : accOppMap02.get(acc)){
            System.debug(op.stageName);
        }
    }
