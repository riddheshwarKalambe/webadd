public with sharing class AccountControllerLWC {
    // @AuraEnabled(cacheable=true)
    // public static List<Contact> queryRelatedContacts(Id accountId) {
    //     return [ select Name, Title, Email, Phone,Account.Name from Contact where AccountId = :accountId];

    // }
        @AuraEnabled(cacheable=true)
        public static List<User__c> queryRelatedUser(Id Name) {
            return [ select Name, First_Name__c, City__c, State__c, Phone__c, Email_Address__c from User__c];
    
        }


        @AuraEnabled
        public static string deleteSelectedAccounts(List<ID> accIDList){
            try {
                if(!accIDList.isEmpty()){
                delete ([select Name from User__c where Id IN : accIDList]);
                return 'Selected Records have been deleted successfully...!!!';
                }
                else{
                        return 'There is no records are selected';
                }
            } catch (Exception e) {
    
                 System.debug('# Messege = '+e.getMessage());
                 return 'SomeProblem..!!';
    
               
               
            }
        }



        @AuraEnabled
    public static List<User__c> getAllAccountsType(Id Name){
        try {
          
            return ([select Name, First_Name__c, City__c, State__c, Phone__c, Email_Address__c from User__c]);
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }



    //======================Delete Selected Users to Admin in Lightning web component===========================
    
@AuraEnabled
public static List<User__c> fetchUsers(){
    return [SELECT Id, Name, First_Name__c, City__c, State__c, Phone__c, Email_Address__c from User__c LIMIT 9];
}

//create a account classcode
@AuraEnabled
    public static String createUserRecord(User__c objUser){
        try {
            insert objUser;
            return 'Record created successfully...!!!';

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }




        
}