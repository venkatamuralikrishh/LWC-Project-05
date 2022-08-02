import { LightningElement, wire } from 'lwc';
import pubsub from 'c/lwc_31072020_pubsub';
import { createRecord } from 'lightning/uiRecordApi';
import {CurrentPageReference} from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';

export default class Lwc_0108_pubsub_publisher_02 extends LightningElement {
    accountId='';
    
    accounts = [];
    name='';
    //get the current page reference
    @wire(CurrentPageReference) pageRef;
    //change the value onchange of input
    inputHandler(e){
        this.name = e.target.value;
    }
    // create record based on input given by user
    // and publish the event using the fireEvent in pubsub module
    clickHandler(){
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        // recordInput object takes 2 params, one is objectApiName and second is fields
        const recordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(account => {
                this.accountId = account.id;
                this.accounts.push(account);
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success',
                    }),
                );
                pubsub.fireEvent(this.pageRef, 'sendAcc', this.accounts);
                console.log(this.accounts);
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
        // publish the fireEvent to pass data to subscriber component
       //pubsub.fireEvent(this.pageRef, 'sendAcc', this.accounts);
    }
}