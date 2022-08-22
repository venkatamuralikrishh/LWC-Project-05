import { LightningElement } from "lwc";

export default class Lwc_2108_paginator extends LightningElement {
  /**
   * This is generic Paginator component
   * It will display the previous and next buttons to change the pages in pagination
   * Use this as child component in your main LWC component pagination
   */
  leftHandler() {
    this.dispatchEvent(new CustomEvent("left"));
  }
  rightHandler() {
    this.dispatchEvent(new CustomEvent("right"));
  }
}
