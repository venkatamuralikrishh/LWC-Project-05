public with sharing class caseTriggerToUpdateCheckBoxFieldHandler {    
    public static void onBeforeInsert(List<Case> newCases){
        updateCases(newCases);
    }
    public static void onBeforeUpdate(Map<Id,Case> newMap, Map<Id,Case> oldMap){
        List<Case> cases = new List<Case>(); 
        for(Case c : newMap.values()){
            if(c.Region__c != oldMap.get(c.Id).Region__c){
                cases.add(c);
            }
        }
        updateCases(cases);
    }
    private static void updateCases(List<Case> casesToUpdate){
        for(Case c : casesToUpdate){
            if(c.Region__c == 'India'){
                c.isIndia__c = true;
                c.isJapan__c = false;
            }
            if(c.Region__c == 'Japan'){
                c.isIndia__c = false;
                c.isJapan__c = true;
            }
            if(c.Region__c == null){
                c.isIndia__c = false;
                c.isJapan__c = false;
            }
        }
    }
}
