trigger accOppCreatedDateTrigger on Account (after update) {

    if(trigger.isAfter && trigger.isUpdate){
        accOppCreatedDateTriggerHandler.updateOpportunities(trigger.oldMap, trigger.newMap);
    }
}