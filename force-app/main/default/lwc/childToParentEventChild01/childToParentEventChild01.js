import { LightningElement,wire } from 'lwc';
import getAccounts from '@salesforce/apex/Lwc_0708_deleteRecordWithOutApexHandler.getAccounts';

export default class ChildToParentEventChild01 extends LightningElement {
    accounts;
    error;
    @wire(getAccounts)
    wiredAccounts(result){
        if(result.data){
            this.accounts = result.data;
        }
        else if(result.error){
            this.error = result.error;
        }
    }
    
    clickHandler(evt){
        const event = new CustomEvent('send',{
            detail : {
                accounts : this.accounts
            }
        })
        this.dispatchEvent(event);
    }
}