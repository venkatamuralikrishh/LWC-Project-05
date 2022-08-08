import { LightningElement, wire } from 'lwc';

export default class ChildToParentEventParent01 extends LightningElement {
    columns=[
                { label: 'Id', fieldName: 'Id' },
                { label: 'Name', fieldName: 'Name' },
            ];
    accData;
    sendHandler(event){
        this.accData = event.detail.accounts;
    }
}