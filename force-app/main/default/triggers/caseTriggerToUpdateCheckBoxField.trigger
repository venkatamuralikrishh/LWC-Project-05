trigger caseTriggerToUpdateCheckBoxField on Case (before insert, before update, before delete, after insert, after update, after delete, after undelete) {

    if(trigger.isInsert && trigger.isBefore){
        caseTriggerToUpdateCheckBoxFieldHandler.onBeforeInsert(trigger.new);
    }
    if(trigger.isUpdate && trigger.isBefore){
        caseTriggerToUpdateCheckBoxFieldHandler.onBeforeUpdate(trigger.newMap, trigger.oldMap);
    }
}