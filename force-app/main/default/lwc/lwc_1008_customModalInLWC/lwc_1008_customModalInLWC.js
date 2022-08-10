import { LightningElement } from 'lwc';

export default class Lwc_1008_customModalInLWC extends LightningElement {
    name='';
    showModal = false;
    showHanlder(){
        this.showModal = true;
        this.name = '';
    }
    cancelHandler(){
        this.showModal = false;
    }
    /*
    inputHandler(evt){
        this.name=evt.target.value;
    }
    */
    saveHandler(){
        this.showModal = false;
        this.name = this.template.querySelector('.input').value;
        this.name = this.name.toUpperCase();
    }
}