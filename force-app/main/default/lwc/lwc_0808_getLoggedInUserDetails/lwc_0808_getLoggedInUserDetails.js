import { LightningElement, wire } from 'lwc';
import Id from '@salesforce/user/Id';
import { getRecord , getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/User.Name';
import EMAIL_FIELD from '@salesforce/schema/User.Email';

const fields = [NAME_FIELD, EMAIL_FIELD];

export default class Lwc_0808_getLoggedInUserDetails extends LightningElement {
    userId = Id;
    user;
    error;
    @wire(getRecord, {recordId : '$userId', fields})
    wiredUser(result){
        if(result.data){
            console.log(result.data);
            this.user = result.data;
            console.log(typeof this.user);
        }
        else if(result.error){
            console.log(result.error);
            this.error = result.error;
        }
    }
    /*
    get userName(){
        return getFieldValue(this.user, NAME_FIELD);
    }
    get userEmail(){
        return getFieldValue(this.user, EMAIL_FIELD);
    }
    */
}