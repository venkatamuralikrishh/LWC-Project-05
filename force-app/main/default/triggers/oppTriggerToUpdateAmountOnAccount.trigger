trigger oppTriggerToUpdateAmountOnAccount on Opportunity (after insert, after update, after delete, after undelete) {
    if(trigger.isInsert && trigger.isAfter){
        oppTriggerToUpdateAmountOnAccountHandler.onAfterInsert(trigger.newMap);
    }
    if(trigger.isAfter && trigger.isUpdate){
        oppTriggerToUpdateAmountOnAccountHandler.onAfterUpdate(trigger.oldMap, trigger.newMap);
    }
    if(trigger.isAfter && trigger.isDelete){
        oppTriggerToUpdateAmountOnAccountHandler.onAfterDelete(trigger.oldMap);
    }
    if(trigger.isAfter && trigger.isUndelete){
        oppTriggerToUpdateAmountOnAccountHandler.onAfterUndelete(trigger.newMap);
    }
}