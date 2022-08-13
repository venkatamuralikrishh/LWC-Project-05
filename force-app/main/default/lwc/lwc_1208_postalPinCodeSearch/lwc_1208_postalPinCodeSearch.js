import { LightningElement, track } from 'lwc';
import getDetailsOfPincode from '@salesforce/apex/HTTP_PostalPinCodeApi.getDetailsOfPincode';
import getPinCode from '@salesforce/apex/HTTP_PostalPinCodeApi.getPinCode';

export default class Lwc_1208_postalPinCodeSearch extends LightningElement {
    pin='';
    cityName='';
    @track data=[];
    @track pinCodes = [];
    error;
    searchHandler(evt){
        this.data = [];
        this.pinCodes = [];
        this.pin = this.template.querySelector('.pin').value;
        this.cityName = this.template.querySelector('.city').value;
        getDetailsOfPincode({pincode : this.pin})
        .then((result)=>{
            for(var key in result){
                this.data.push({name : key, district : result[key]});
                // we are creating an array to show it on UI
            }
            console.log('line 20 : ', this.data);
            console.log('line 21 : ', typeof this.data);
        })
        .catch((error)=>{
            this.error = error;
        });
        getPinCode({cityName : this.cityName})
        .then((result)=>{
            console.log('line 28 : inside then block');
            for(var k in result){
                this.pinCodes.push({pin : 'pin', pinCode : result[k]});
                // we are creating an array to show it on UI
            }
            console.log('line 33 : ', this.pinCodes);
        })
        .catch((error)=>{
            this.error = error;
        });
    }

}