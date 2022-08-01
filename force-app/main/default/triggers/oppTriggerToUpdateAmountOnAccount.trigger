trigger oppTriggerToUpdateAmountOnAccount on Opportunity (after update) {
    
    if(trigger.isAfter && trigger.isUpdate){
        oppTriggerToUpdateAmountOnAccountHandler.updateAccounts(trigger.oldMap, trigger.newMap);
    }
}