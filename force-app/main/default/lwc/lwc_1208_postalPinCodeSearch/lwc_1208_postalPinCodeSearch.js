import { LightningElement, track } from 'lwc';
import getDetailsOfPincode from '@salesforce/apex/HTTP_PostalPinCodeApi.getDetailsOfPincode';

export default class Lwc_1208_postalPinCodeSearch extends LightningElement {
    pin='';
    @track data=[];
    error;
    searchHandler(evt){
        this.data = [];
        this.pin = this.template.querySelector('lightning-input').value;
        getDetailsOfPincode({pincode : this.pin})
        .then((result)=>{
            for(var key in result){
                this.data.push({name : key, district : result[key]});
                // we are creating an array to show it on UI
            }
            console.log(this.data);
            console.log(typeof this.data);
        })
        .catch((error)=>{
            this.error = error;
        })
    }
}