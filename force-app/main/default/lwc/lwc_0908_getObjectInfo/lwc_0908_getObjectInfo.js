import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { LightningElement, wire } from 'lwc';

export default class Lwc_0908_getObjectInfo extends LightningElement {
    inputValue;
    objectInfo;
    showObjectInfo;
    inputHandler(evt){
        this.inputValue = evt.target.value;
    }
    @wire(getObjectInfo, {objectApiName : '$inputValue'}) objectInfo;
    clickHandler(evt){
        if(this.objectInfo.data){
            this.showObjectInfo = JSON.stringify(this.objectInfo.data, null, 10);
        }
    }
}