import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/Lwc_0708_deleteRecordWithOutApexHandler.getAccounts';
import {deleteRecord} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {refreshApex} from '@salesforce/apex';


export default class Lwc_0708_deleteRecordWithOutApex extends LightningElement {
    accounts;
    wiredAccountsResult;
    @wire(getAccounts)
    wiredAccounts(result){
        this.wiredAccountsResult = result;
        if(result.data){
            this.accounts = result.data;
        }
        else if(result.error){
            this.accounts = result.error;
        }
    }
    deleteHandler(event){
        deleteRecord(event.target.dataset.recordid)
        .then(()=>{
            this.dispatchEvent(new ShowToastEvent({
                title : 'account deleted successfully',
                message : 'account',
                variant : 'success'
            }),
            );
            return refreshApex(this.wiredAccountsResult);
        })
        .catch((error)=> {
            this.dispatchEvent(new ShowToastEvent({
                title : 'account not deleted',
                message : 'error',
                variant : 'Error'
            }),
            );
        });
    }
}