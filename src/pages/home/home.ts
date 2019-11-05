import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  response: any

  constructor(
    public navCtrl: NavController,
    public restProvider: RestProvider,
    private iab: InAppBrowser
    ) {
  }

  Payment() {
    
    this.restProvider.fetchPaypalPaymentFirstStep()
    .then(data => {
      this.response = data
      if (this.response.status == 200) {
        const browser = this.iab.create(this.response.approval_url, '_blank');
        browser.show()
      }
    });
  }

}
