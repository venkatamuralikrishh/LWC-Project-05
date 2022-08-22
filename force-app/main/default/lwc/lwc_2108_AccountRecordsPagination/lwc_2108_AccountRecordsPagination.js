import { LightningElement, track, wire } from "lwc";
import AccountController from "@salesforce/apex/AccountController.retrieveAllAccounts";
import updateAccounts from "@salesforce/apex/AccountController.updateAccounts";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { getRecordNotifyChange } from "lightning/uiRecordApi";
import { refreshApex } from "@salesforce/apex";

export default class Lwc_2108_AccountRecordsPagination extends LightningElement {
  /**
   * This is to display the Account records in pagination way
   * Using Lightning Datatable
   */
  @track value = 5;

  get options() {
    return [
      { label: 5, value: 5 },
      { label: 10, value: 10 },
      { label: 15, value: 15 }
    ];
  }
  @track currentPageNum = 1; // the current Page number, initial value is 1
  @track totalRecords = []; // the Total records retrieved from database
  @track displayRecords = []; // the records that should display in a particular page
  @track error;
  @track totalRecordCount = 0; // the Total records count to be displayed in pagination
  @track recordsPerPage = 5; // the record count per page in pagination
  @track totalPages = 0; // the total no of pages in pagination
  @track draftValues = []; // holds the modified values in the data-table
  @track errorMessage; // from saveHandler method catch block
  @track sortedBy = "Name"; //holds the fieldName when sorting event fired
  /**
   * holds the direction of sorting when sorting event is fired
   * by default, it is asc, if sort event is fired its value will be desc.
   * again if sort event is fired, its value changes from desc to asc
   */
  @track sortedDirection = "asc";

  //columns to display in the data-table
  @track columns = [
    {
      label: "Id",
      fieldName: "Id",
      cellAttributes: {
        iconName: "standard:account_info",
        iconAlternativeText: "Account Info",
        alignment: "left"
      },
      iconName: "utility:freeze_column",
      sortable: true,
      displayReadOnlyIcon: true
    },
    {
      label: "Name",
      fieldName: "Name",
      cellAttributes: {
        iconName: "standard:person_name",
        iconAlternativeText: "Account Holder",
        alignment: "left"
      },
      editable: true,
      iconName: "utility:groups",
      sortable: true
    },
    {
      label: "Type",
      fieldName: "Type",
      cellAttributes: {
        class: "slds-text-color_success",
        alignment: "left"
      },
      editable: true,
      iconName: "utility:edit",
      sortable: true
    },
    {
      label: "Billing Country",
      fieldName: "BillingCountry",
      cellAttributes: {
        iconName: "standard:address",
        iconAlternativeText: "Account Address",
        alignment: "left"
      },
      editable: true,
      iconName: "utility:home",
      sortable: true
    },
    {
      label: "Annual Revenue",
      fieldName: "AnnualRevenue",
      cellAttributes: {
        iconName: "utility:money",
        iconAlternativeText: "Account Address",
        alignment: "left"
      },
      editable: true,
      iconName: "utility:moneybag",
      sortable: true
    },
    {
      label: "Phone",
      fieldName: "Phone",
      type: "Phone",
      cellAttributes: {
        iconName: "utility:phone_portrait",
        iconAlternativeText: "Account Address",
        alignment: "left"
      },
      editable: true,
      iconName: "utility:outbound_call",
      sortable: true
    },
    {
      label: "Is Active?",
      fieldName: "isActive__c",
      type: "boolean",
      cellAttributes: {
        iconName: "utility:question",
        iconAlternativeText: "Account Address",
        alignment: "left"
      },
      editable: true,
      iconName: "standard:question_post_action",
      sortable: true
    },
    {
      label: "SLA ExpirationDate",
      fieldName: "SLAExpirationDate__c",
      type: "Date",
      cellAttributes: {
        iconName: "utility:date_input",
        iconAlternativeText: "Account Address",
        alignment: "left"
      },
      editable: true,
      iconName: "standard:date_time",
      sortable: true
    }
  ];

  //retrieve the account records from database using wire service
  @wire(AccountController, {
    sortedBy: "$sortedBy",
    sortedDirection: "$sortedDirection"
  })
  wiredAccounts({ data, error }) {
    if (data) {
      this.totalRecords = data;
      this.totalRecordCount = data.length;
      this.totalPages = Math.ceil(this.totalRecordCount / this.recordsPerPage);
      /**
       * slice method will return the new array and won't change the original array
       * slice the totalRecords based on the start and ending values
       * Initially start value will be 0, end value will be record count per page=5
       * displayRecords contains (0th, 1st, 2nd, 3rd, 4th) index values
       */
      this.displayRecords = this.totalRecords.slice(0, this.recordsPerPage);

      this.error = undefined;
    }
    if (error) {
      this.data = undefined;
      this.error = error;
    }
  }

  //this method is called when the previous button clicked
  leftHandler() {
    if (this.currentPageNum > 1) {
      //when previous button is clicked, decrement the currentPageNum
      this.currentPageNum--;
      this.updateDataTableRecords();
    }
  }

  //this method is called when the next button clicked
  rightHandler() {
    if (this.currentPageNum < this.totalPages) {
      //when next button is clicked, increment the currentPageNum
      this.currentPageNum++;
      this.updateDataTableRecords();
    }
  }

  //this method will update the records to be displayed in the page based on the currentPageNum
  updateDataTableRecords() {
    /**
     * slice method will slice the original array and retuns the new array
     * slice will take 2 parameters i.e start and end index of array
     * assume currentPageNum = 2; start value should be 6th record in array(index value is 5)
     * page should contain 5 records, then end value should be 11th record in array (index is 10)
     */
    const start = (this.currentPageNum - 1) * this.recordsPerPage; // (2-1) * 5 = 5
    const end = this.currentPageNum * this.recordsPerPage; // 2*5 = 10
    this.displayRecords = this.totalRecords.slice(start, end);
  }

  /**
   * this method will update the modified values into database by calling the apex method imperatively
   * all the modified records will be stored in the draftValues property as an array of objects
   */
  async saveHandler(evt) {
    const modifiedRecords = evt.detail.draftValues;

    console.log(modifiedRecords);
    const notifyChangeIds = modifiedRecords.map((row) => {
      return { recordId: row.Id };
    });
    await updateAccounts({ obj: modifiedRecords })
      .then((result) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: result,
            variant: "Success"
          })
        );
        //clear the draftValues property to hide the datatable property
        this.draftValues = [];
        // refresh the data to display latest data in the data-table without refreshing the page
        refreshApex(this.totalRecords);
        // update the LDS cache and wires
        //getRecordNotifyChange(notifyChangeIds);
      })
      .catch((error) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Failed to save",
            message: error.body,
            variant: "Error"
          })
        );
      });
  }

  // used for sorting the data in the data-table (with the help of server call)
  sortHandler(evt) {
    this.sortedBy = evt.detail.fieldName;
    this.sortedDirection = evt.detail.sortDirection;
  }

  // used for changing the data in data-table based on the input page number
  inputHandler(evt) {
    this.currentPageNum = evt.target.value;
    this.updateDataTableRecords();
  }

  //used for changing the recordsPerPage
  handleChange(evt) {
    this.recordsPerPage = evt.target.value;
    this.totalPages = Math.ceil(this.totalRecordCount / this.recordsPerPage);
    this.updateDataTableRecords();
  }
}
