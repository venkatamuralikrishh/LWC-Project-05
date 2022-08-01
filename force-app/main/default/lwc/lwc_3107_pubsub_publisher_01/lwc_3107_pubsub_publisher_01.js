import { LightningElement, wire } from 'lwc';
import pubsub from 'c/lwc_31072020_pubsub';
import {CurrentPageReference} from 'lightning/navigation';

export default class Lwc_3107_pubsub_publisher_01 extends LightningElement {

    txt='';
    // get the page reference
    @wire(CurrentPageReference) pageRef;

    // onchange of input, assign it to local variable txt
    handleChange(e){
        this.txt = e.target.value;
    }

    //call the fireEvent in pubsub component and pass the txt value as payload
    clickHandler(){
        pubsub.fireEvent(this.pageRef, 'sendText', this.txt);
        this.txt='';
    }

}