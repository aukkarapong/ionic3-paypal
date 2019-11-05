import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  apiUrl = 'http://zp11107.tld.122.155.17.167.no-domain.name/paypal-2019';

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }

  fetchPaypalPaymentFirstStep() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/first.php').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
