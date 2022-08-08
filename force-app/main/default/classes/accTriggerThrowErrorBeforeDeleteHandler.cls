public with sharing class accTriggerThrowErrorBeforeDeleteHandler {
    //Write a trigger on account object if that account have 2 or more contacts associated with it we cannot delete that account

    public static void throwError(Map<Id,Account> oldMap){
		List<Contact> conList = [SELECT Id,firstName,AccountId from Contact WHERE AccountId IN : oldMap.keySet()];
        for(Account acc : oldMap.values()){
            Integer i = 0;
            for(Contact con : conList){
                if(con.AccountId == acc.Id){
                    i+=1;
                }
            }
            if(i>2){
				acc.addError('You cannot delete the account record because it has more than 2 contacts');
			}
        }
	}
}
