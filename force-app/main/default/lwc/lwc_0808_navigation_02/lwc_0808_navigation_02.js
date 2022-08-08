import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/Lwc_0708_deleteRecordWithOutApexHandler.getAccounts';
import { NavigationMixin } from 'lightning/navigation';

export default class Lwc_0808_navigation_02 extends NavigationMixin(LightningElement) {
    @wire(getAccounts) accounts;
    clickHandler(evt){
        this[NavigationMixin.GenerateUrl]({
            type: "standard__recordPage",
            attributes: {
                recordId: evt.currentTarget.dataset.accountId,
                objectApiName: 'Account',
                actionName: 'view'
            }
        })
        .then((url)=>{
            window.open(url, '_blank');
        })
    }
}