import { LightningElement } from 'lwc';
import LightningAlert from 'lightning/alert';
import LightningConfirm from 'lightning/confirm';
import LightningPrompt from 'lightning/prompt';

export default class Lwc_1008_displayNotifications_modals_Popups extends LightningElement {
    name;
    error;
    alertHandler(){
        LightningAlert.open({
            label : 'alert',
            message : 'this is alert message',
            theme : 'error'
        });
    }
    confirmHandler(){
        LightningConfirm.open({
            label : 'Confirm?',
            message : 'You want to continue?',
            theme : 'warning'
        });
    }
    promptHandler(){
        LightningPrompt.open({
            label : 'Prompt!',
            message : 'Enter your name',
            theme : 'info'
        })
        .then((result)=>{
            this.name = result;
        })
        .catch((error)=>{
            this.error = error;
        })
    }
}