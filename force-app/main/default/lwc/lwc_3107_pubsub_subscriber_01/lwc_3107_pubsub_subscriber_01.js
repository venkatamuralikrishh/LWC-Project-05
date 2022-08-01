import { LightningElement, wire } from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import pubsub from 'c/lwc_31072020_pubsub';

export default class Lwc_3107_pubsub_subscriber_01 extends LightningElement {
    text='';

    //we should get the pagereference and attach that variable to global object in subscriber component
    //before listening to events, subscriber component first will check whether the event is coming from same page or not
    //If the event is not from same page, it wont get the data and it will throw an error defined in the default pubsub module
    @wire(CurrentPageReference) pageRef;

    //This LWC hook will execute when the component is loaded/Rendered on the DOM and will listen to the event
    connectedCallback(){
        pubsub.registerListener('sendText',this.handleIncomingText, this);
    }

    //This LWC hook will execute when the component is removed from the DOM
    disconnectedCallback(){
        pubsub.unregisterAllListeners(this);
    }

    //This method will update the text variable with incoming message
    handleIncomingText(message){
        this.text = message;
    }
}