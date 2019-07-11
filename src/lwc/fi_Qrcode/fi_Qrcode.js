import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'

import QriousJS from '@salesforce/resourceUrl/QriousJS';

export default class Fi_Qrcode extends LightningElement {

  @api strIconName;
  @api strTitle;

  renderedCallback() {
    if (this.chartJSRendered) {
        return;
    }
    this.chartJSRendered = true;

    Promise.all([
        loadScript(this, QriousJS + '/')
    ])
        .then(() => {
            // eslint-disable-next-line no-console
            console.info("QriousJS Loaded");
            this.initializeQR();
        })
        .catch(error => {
            this.dispatchEvent(
                // eslint-disable-next-line no-undef
                new ShowToastEvent({
                    title: 'Error loading QriousJS',
                    message: error.message,
                    variant: 'error',
                }),
            );
        });
}

  initializeQR() {
    window.myLine = new QRious({
      element: this.template.querySelector('canvas'),
      value: 'https://github.com/firo'
    });

  }

}
