import { LightningElement } from 'lwc';
import hasAccess from '@salesforce/customPermission/lwcCustomPermission';

export default class Lwc_0908_permissionBasedUI extends LightningElement {
    get checkAccess(){
        return hasAccess;
    }
}