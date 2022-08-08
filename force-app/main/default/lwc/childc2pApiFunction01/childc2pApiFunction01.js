import { api, LightningElement } from 'lwc';

export default class Childc2pApiFunction01 extends LightningElement {
    date = new Date();
    @api
    dateModifier(){
        this.date = new Date();
        
    }
}