import { LightningElement } from 'lwc';
import {NavigationMixin} from 'lightning/navigation';


export default class Lwc_0208_navigation_01 extends NavigationMixin(LightningElement) {
    //This will navigate to the standard home page in the standard app only.
    homeHandler(){        
        this[NavigationMixin.Navigate]({
            type: "standard__namedPage",
            attributes: {
              pageName: "home"
            }
          });
    }
    //navigate the case tab in the LightningSales app
    caseTabHandler(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Case',
                actionName : 'home'
            }
        })
    }
    // navigate to account tab recently viewed list view
    accListViewHandler(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Account',
                actionName : 'list'
            },
            state : {
                filterName : 'Recent'
            }
        })
    }
    //contact record new section
    conNewHandler(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes : {
                objectApiName : 'Contact',
                actionName : 'new'
            }
        })
    }
    //open the Account record View Page
    accViewHandler(){
        this[NavigationMixin.Navigate]({
            type : 'standard__recordPage',
            attributes : {
                recordId : '0015j000009vRSJAA2',
                objectApiName : 'Account',
                actionName : 'view'
            }
        })
    }
    //navigate to the LWC_Page_01 in custom app : Lightning_Web_Components_01
    lwcPageHandler(){
        this[NavigationMixin.Navigate]({
            type : 'standard__app',
            attributes :{
                appTarget : 'c__Lightning_Web_Components_01',
                pageRef : {
                    type : 'standard__navItemPage',
                    attributes : {
                        apiName : 'LWC_Page_01'
                    } 
                }
            }
        })
    }
}