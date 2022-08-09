import { LightningElement } from 'lwc';
import salesforcebolt from '@salesforce/resourceUrl/salesforcebolt';
import salesforcetroop from '@salesforce/resourceUrl/salesforcetroop';
import salesforceapexhours from '@salesforce/resourceUrl/salesforceapexhours';

export default class Lwc_0908_staticResourcesUsageInLwc extends LightningElement {
    salesforceboltUrl = salesforcebolt; //It gives the url of that resource
    salesforcetroopUrl = salesforcetroop;
    salesforceapexhoursUrl = salesforceapexhours;
}