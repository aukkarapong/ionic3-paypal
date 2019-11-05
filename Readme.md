# Ionic3-Paypal

## สร้าง Project
```
ionic start ionic-paypal blank
```

## เข้าไปใน Directory
```
cd ionic-paypal
```

## ลง package ต่าง ๆ เพื่อที่จะทำการเรียก api ผ่าน rest service
```
npm install @angular/common@5.2.11 --save
npm install @angular/compiler@5.2.11 --save
npm install @angular/compiler-cli@5.2.11 --save
npm install @angular/core@5.2.11 --save
npm install @angular/forms@5.2.11 --save
npm install @angular/http@5.2.11 --save
npm install @angular/platform-browser@5.2.11 --save
npm install @angular/platform-browser-dynamic@5.2.11 --save
```

## เพิ่ม HttpClientModule ใน src/app/app.module.ts
```
import { HttpClientModule } from '@angular/common/http';
...
imports: [
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
],
...
```
## ลง plugin เพื่อให้เปิด browser ใน application
```
ionic cordova plugin add cordova-plugin-inappbrowser
npm install --save @ionic-native/in-app-browser@4
```

## เพิ่ม InAppBrowser ใน src/app/app.module.ts
```
import { InAppBrowser } from '@ionic-native/in-app-browser';
...
@NgModule({
  ...
  providers: [
    ...
    InAppBrowser
  ]
})
```

## สร้าง rest provider
```
ionic g provider Rest
```

## เพิ่ม RestProvider ใน src > app > app.module.ts
```
...
import { RestProvider } from '../providers/rest/rest';
...
@NgModule({
  ...
  providers: [
    ...
    RestProvider,
    ...
  ]
})
```

## เขียน function ใน providers > rest > rest.ts เพื่อเรียกใช้งาน first.php
```
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
```

## แก้ไข src > pages > home > home.html
```
<ion-header>
  <ion-navbar>
    <ion-title>
      Paypal payment sample
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content padding>
  <ion-card>

    <img src="https://imgaz.staticbg.com/images/oaupload/banggood/images/A3/F5/f11dfd8f-c090-49d6-b358-622f67bc52e1.jpg"/>

    <ion-card-content>
      <ion-card-title>
        Xiaomi Mijia MJTD01YL LED โคมไฟตั้งโต๊ะแบบสมาร์ทลดแสงเพื่ออ่านหนังสือสำหรับโทรศัพท์เคลื่อนที่
      </ion-card-title>
      <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </ion-card-content>

    <ion-item>
      <ion-icon name='logo-usd' item-start style="color: #d03e84"></ion-icon>
      ราคาต่อชิ้น
      <ion-badge item-end>100.00 บาท</ion-badge>
    </ion-item>

    <ion-item>
      <ion-icon name='cart' item-start style="color: #d03e84"></ion-icon>
      จำนวน
      <ion-badge item-end>1 หน่วย</ion-badge>
    </ion-item>

    <ion-item>
      <ion-icon name='logo-usd' item-start style="color: #55acee"></ion-icon>
      ราคารวม
      <ion-badge item-end>100.00 บาท</ion-badge>
    </ion-item>

  </ion-card>

  <button ion-button full (click)="Payment()">ชำระเงิน</button>
</ion-content>
```

## ปุ่ม "ชำระเงิน" จะเรียก function Payment() ใน home.ts เพื่อเรียกใช้งาน rest api
```
<button ion-button full (click)="Payment()">ชำระเงิน</button>
``` 

## แก้ไข src > pages > home > home.ts
```
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
```

## run ionic application บน simulator ios
```
ionic cordova platform remove ios && ionic cordova platform add ios
cd platforms/ios/cordova && npm install ios-sim@latest && cd ../../../
ionic cordova emulate ios -- --buildFlag="-UseModernBuildSystem=0"
```


