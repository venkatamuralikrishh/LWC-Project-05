trigger accTriggerThrowErrorBeforeDelete on Account (before delete) {

    //Write a trigger on account object if that account have 2 or more contacts associated with it we cannot delete that account
    if(trigger.isBefore && trigger.isDelete){
        accTriggerThrowErrorBeforeDeleteHandler.throwError(trigger.oldMap);
    }
}