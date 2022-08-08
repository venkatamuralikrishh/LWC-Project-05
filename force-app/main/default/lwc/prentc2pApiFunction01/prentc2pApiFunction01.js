import { LightningElement } from 'lwc';

export default class Prentc2pApiFunction01 extends LightningElement {
    clickHandler(){
        this.template.querySelector('c-childc2p-api-function01').dateModifier();
    }
}