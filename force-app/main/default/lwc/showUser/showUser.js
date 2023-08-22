import { api, LightningElement, track, wire } from 'lwc';
import queryRelatedUser from '@salesforce/apex/AccountControllerLWC.queryRelatedUser';
//==================new import========///
import fetchUsers from '@salesforce/apex/AccountControllerLWC.fetchUsers';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//create a user
import createUserRecord from "@salesforce/apex/AccountControllerLWC.createUserRecord";


export default class ShowUser extends LightningElement { 
    showMessageFlag=false;


    //===============================userList display to admin in lwc==================================================

    

    @api recordId;
    @track columnsjs = [ {label:'User Id', fieldName:'Name', type:'text', sortable:true},
    {label:'First Name', fieldName:'First_Name__c', type:'text', sortable:true},
    {label:'City', fieldName:'City__c', type:'text', sortable:true},
    {label:'State', fieldName:'State__c', type:'text', sortable:true},
    {label:'Phone Number', fieldName:'Phone__c', type:'number', sortable:true},
    {label:'Email Addres', fieldName:'Email_Address__c', type:'text', sortable:true},
];
@wire(queryRelatedUser,{Name:'$recordId'})
Users;

//==Delete users to admin in lwc=================================================


    //==userList display to admin in lwc=================================================

    @track lstUser__c = [];
  constructor(){
      super();
      // Imperative Apex call to get the list of Opportunities
      fetchUsers({}).then(response => {
          this.lstUser__c = response;
      }).catch(error => {
          console.log('Error: ' +error.body.message);
      });
  }
  deleteUser(event){
      let deleteId = event.target.value;
      deleteRecord(deleteId)
      .then(() => {
          this.dispatchEvent(
              new ShowToastEvent({
                  title: 'Success',
                  message: 'Record deleted successfully',
                  variant: 'success'
              })
          );
          // To delete the record from UI
          for(let user in this.lstUser__c){
              if(this.lstUser__c[user].Id == deleteId){
                  this.lstUser__c.splice(user, 1);
                  break;
              }
          }
      })
      .catch(error => {
          console.log(error);
      });
  }



  //create a user Account

  Countryvalue = 'India';

    get Countryoptions() {
        return [
            { label: 'America', value: 'America' },
            { label: 'India', value: 'India' },
        ];
    }

    handleChangeCountry(event) {
        this.Countryvalue = event.detail.value;
    }


    Statevalue = 'Maharashtra';

    get Stateoptions() {
        return [
            { label: 'Alabama', value: 'Alabama' },
            { label: 'Alaska', value: 'Alaska' },
            { label: 'Arizona', value: 'Arizona' },
            { label: 'Delhi', value: 'Delhi' },
            { label: 'Maharashtra', value: 'Maharashtra' },
            { label: 'TamilNadu', value: 'TamilNadu' },
        ];
    }

    handleChangeState(event) {
        this.Statevalue = event.detail.value;
    }

    Cityvalue = 'India';

    get Cityoptions() {
        return [
            { label: 'Birmingham', value: 'Birmingham' },
            { label: 'Huntsville', value: 'Huntsville' },
            { label: 'Mobile', value: 'Mobile' },
            { label: 'Montgomery', value: 'Montgomery' },
            { label: 'Anchorage', value: 'Anchorage' },
            { label: 'InJuneaudia', value: 'InJuneaudia' },
            { label: 'Fairbanks', value: 'Fairbanks' },
            { label: 'North Pole', value: 'North Pole' },
            { label: 'Phoenix', value: 'Phoenix' },
            { label: 'Tucson', value: 'Tucson' },
            { label: 'Scottsdale', value: 'Scottsdale' },
            { label: 'Mesa', value: 'Mesa' },
            { label: 'Nagpur', value: 'Nagpur' },
            { label: 'Mumbai', value: 'Mumbai' },
            { label: 'Pune', value: 'Pune' },
            { label: 'Nashik', value: 'Nashik' },
            { label: 'Mehrauli	', value: 'Mehrauli' },
            { label: 'Siri', value: 'Siri' },
            { label: 'Tughlakabad', value: 'Tughlakabad' },
            { label: 'Firozabad', value: 'Firozabad' },
            { label: 'Chennai', value: 'Chennai' },
            { label: 'Coimbatore', value: 'Coimbatore' },
            { label: 'Madurai', value: 'Madurai' },
            { label: 'Tiruchirapalli', value: 'Tiruchirapalli' },
        ];
    }

    handleChangeCity(event) {
        this.Cityvalue = event.detail.value;
    }




    SecreteQuestionvalue = 'India';

    get SecreteQuestionoptions() {
        return [
            { label: 'In what city were you born?', value: 'In what city were you born?' },
            { label: 'What is the name of your favorite pet?', value: 'What is the name of your favorite pet?' },
            { label: 'What is your mothers maiden name?', value: 'What is your mothers maiden name?' },
            { label: 'What high school did you attend?', value: 'What high school did you attend?' },
            { label: 'What was the name of your elementary school?', value: 'What was the name of your elementary school?' },
            { label: 'What was the make of your first car?', value: 'What was the make of your first car?' },
            { label: 'What was your favorite food as a child?', value: 'InWhat was your favorite food as a child?dia' },
        ];
    }

    handleChangeSecreteQuestion(event) {
        this.SecreteQuestionvalue = event.detail.value;
    }




















  userObject = {'sobjectType' : 'User__c'}
    result
    error
    createNewUserHandler(){
        this.showMessageFlag=true;
        this.saveNewUserHandler;
    }
    saveNewUserHandler(event){
        debugger


        eval("$A.get('e.force:refreshView').fire();");
       
        this.userObject.First_Name__c = this.template.querySelector('lightning-input[data-formfield="UserFirst Name"]').value
      
        this.userObject.Last_Name__c = this.template.querySelector('lightning-input[data-formfield="LastName"]').value
        this.userObject.Email_Address__c = this.template.querySelector('lightning-input[data-formfield="Email"]').value
        this.userObject.Password__c = this.template.querySelector('lightning-input[data-formfield="Password"]').value
        this.userObject.Confirm_Password__c = this.template.querySelector('lightning-input[data-formfield="ConfirmPassword"]').value
        this.userObject.Date_of_Birth__c = this.template.querySelector('lightning-input[data-formfield="D.O.B"]').value
        this.userObject.Address__c = this.template.querySelector('lightning-input[data-formfield="Address"]').value
        this.userObject.Country__c = this.template.querySelector('lightning-input[data-formfield="Country"]').value
        this.userObject.State__c = this.template.querySelector('lightning-input[data-formfield="State"]').value
        this.userObject.City__c = this.template.querySelector('lightning-input[data-formfield="City"]').value
        this.userObject.Phone__c = this.template.querySelector('lightning-input[data-formfield="Phone No"]').value
        this.userObject.Secret_Question__c = this.template.querySelector('lightning-input[data-formfield="Secrete Question"]').value
        this.userObject.Secret_Answer__c = this.template.querySelector('lightning-input[data-formfield="Secret Answer"]').value
   
        console.log("AccountDataRiddu = "+this.userObject);
    
    createUserRecord({ objUser : this.userObject})
    .then((result) => {
      this.result = result;
      console.log("Message = "+this.result);
      
      this.showSuccessToast();
    })
    .catch((error) => {
      this.error = error;
      
      console.log("Message = "+this.error);
    });



    }
    showSuccessToast() {
        const evt = new ShowToastEvent({
            title: 'Message',
            message: this.result,
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(evt);
    }

   

    }