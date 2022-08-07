import { LightningElement } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import COUNTRY_FIELD from '@salesforce/schema/Account.Country__c';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class Lwc_0708_lightningRecordForm_01 extends LightningElement {
    objectApiName = ACCOUNT_OBJECT;
    fields = [NAME_FIELD, PHONE_FIELD, COUNTRY_FIELD];
    handleSuccess(event){
        const evt = new ShowToastEvent({
            title : 'Account Record created successfully',
            message : 'Account Record : ' + event.detail.Id,
            variant : 'success'
        });
        this.dispatchEvent(evt);
    }
}