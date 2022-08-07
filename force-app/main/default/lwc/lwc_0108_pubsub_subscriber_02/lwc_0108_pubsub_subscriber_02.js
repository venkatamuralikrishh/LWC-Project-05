import { LightningElement, track, wire } from 'lwc';
import pubsub from 'c/lwc_31072020_pubsub';
import {CurrentPageReference} from 'lightning/navigation';
const actions = [
    { label: 'View', name: 'view' } 
 ];

export default class Lwc_0108_pubsub_subscriber_02 extends LightningElement {
    @track mycolumns=[
        { label: 'Id', fieldName: 'Id', type: 'text', sortable : 'true' },
        { label: 'Name', fieldName: 'Name', type: 'text', sortable : 'true' },
        { label: 'Website', fieldName: 'website', type: 'url', sortable : 'true' },
        { label: 'Phone', fieldName: 'phone', type: 'phone', sortable : 'true' },
        { type: 'action', typeAttributes: { rowActions: actions, menuAlignment: 'left'} }
    ];
    @ track mydata =[];
    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
        pubsub.registerListener('sendAcc', this.handleCallBack, this);
        //alert('hello');
    }
    disconnectedCallback(){
        pubsub.unregisterAllListeners(this);
    }
    handleRowAction(event){
        const row = event.detail.row;
        pubsub.fireEvent(this.pageRef , 'pubsubEvtToThird' , row);
      
    }
    handleCallBack(data){
        this.mydata = [...this.mydata, data];
        console.log(this.mydata);
    }
}