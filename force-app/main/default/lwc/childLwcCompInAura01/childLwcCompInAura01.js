import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/Lwc_0708_deleteRecordWithOutApexHandler.getAccounts';

export default class ChildLwcInAura01 extends LightningElement {
    @wire(getAccounts) accounts;
    clickHandler(evt){
        evt.preventDefault();
        const event = new CustomEvent('sendAccountId',{
            detail : {
                accountId : evt.currentTarget.dataset.accountId,
            }
        });
        this.dispatchEvent(event);
    }
}