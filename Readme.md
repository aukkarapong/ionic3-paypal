# Paypal

## สร้าง Account Paypal สำหรับ Develop
```
- เข้าไปที่ URL :: https://developer.paypal.com
- ยังไม่มี Account
--- สมัคร Account Paypal
- มี Account แล้ว
--- Login into Dashboard
```



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

## สร้าง rest provider
```
ionic g provider Rest
```
