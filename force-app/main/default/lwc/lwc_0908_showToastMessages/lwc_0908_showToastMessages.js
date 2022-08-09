import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'

export default class Lwc_0908_showToastMessages extends LightningElement {
    successHandler(){
        this.dispatchEvent(new ShowToastEvent({
                title : 'Success',
                message : 'Success toast message',
                variant : 'Success'
            })
        );
    }
    errorHandler(){
        this.dispatchEvent(new ShowToastEvent({
            title : 'Error',
            message : 'Error toast message',
            variant : 'Error'
        })
    );
    }
    warningHandler(){
        this.dispatchEvent(new ShowToastEvent({
            title : 'Warning',
            message : 'Warning toast message',
            variant : 'Warning'
        })
    );
    }
    infoHandler(){
        this.dispatchEvent(new ShowToastEvent({
            title : 'Info',
            message : 'Info toast message',
            variant : 'Info'
        })
    );
    }
}