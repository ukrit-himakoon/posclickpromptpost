import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CryptoJS  from 'crypto-js';
import { CreateorderService } from '../../services/createorder.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'createpayment-component',
    templateUrl: 'createpayment.component.html'
})
export class CreatepaymentComponent implements OnInit {
    constructor(private router: Router,private createorderService: CreateorderService,private app:AppComponent) {}

    merchants = false;
    dayreport: any = [];
    
    texx = '';
    versionno = "";
    merchantid ="";
    paymentdescription = "";
    orderid ="";
    invoiceno="";
    currencyno ="";
    amountno ="";
    customeremail="";
    paycategoryid="";
    promotionno="";
    userdefined1 = "";
    userdefined2 = "";
    userdefined3 = "";
    userdefined4 = "";
    userdefined5 = "";
    resulturl1 = "";
    resulturl2 = "";
    request3ds ="";
    hashvalue = "";

    secretcode = "h0V3gkT45xSg";

    paymentdetail: any = {};
    sendedorder: any = {};
    ngOnInit() {
        if (localStorage.getItem('offlinereport') != null) {
                this.dayreport = JSON.parse(localStorage.getItem('offlinereport'));
            }
        if(sessionStorage.getItem('cartcreateorder')!=null){
                var listorder = JSON.parse(sessionStorage.getItem('cartcreateorder'));
                this.createorderService.list(listorder)
                .then((data: any) => {
                if (data.result == "SUCCESS") {
                   this.sendedorder = data.data;
                      sessionStorage.setItem('createorderresult',JSON.stringify(this.sendedorder));
                      this.paymentdetail = this.sendedorder;
                      this.createreport();
                      this.insertval();
                       sessionStorage.removeItem('cartcreateorder');
                }
            });
        }
        else{
            if(sessionStorage.getItem('createorderresult')!=null){
                this.paymentdetail = JSON.parse(sessionStorage.getItem('createorderresult'));
                this.createreport();
                this.insertval();
                console.log("refresh");
            }
            else{
                this.router.navigate(['/']);
            }
        }
        
        /*if(sessionStorage.getItem('cart')!=null&&sessionStorage.getItem('cartorder')!=null){
            sessionStorage.removeItem('cart');
            sessionStorage.removeItem('cartorder');
            this.app.checkCartvalue();
            var listorder = JSON.parse(sessionStorage.getItem('cartcreateorder'));
            this.createorderService.list(listorder)
                .then((data: any) => {
                if (data.result == "SUCCESS") {
                   this.sendedorder = data.data;
                      sessionStorage.setItem('createorderresult',JSON.stringify(this.sendedorder));
                      this.paymentdetail = this.sendedorder;
                      this.insertval();
                }
            });
        }
        else{
            if(sessionStorage.getItem('createorderresult')!=null){
                this.paymentdetail = JSON.parse(sessionStorage.getItem('createorderresult'));
                this.insertval();
                console.log("refresh");
            }
            else{
                //this.router.navigate(['/']);
            }
        }*/
         //var hash = CryptoJS.HmacSHA1("poom", "zero");
         //var hash = CryptoJS.HmacSHA512("poom", "zero");
        //var hash=  CryptoJS.SHA1('message');
         //this.texx = hash;

    }
    insertval(){
        this.versionno = "6.9";
        this.merchantid ="xxx";
        //this.paymentdescription = "poom";
             this.paymentdescription = this.paymentdetail.customerName;
        //this.orderid ="00000000010000091224";
        //this.orderid = "MO170725000041";
            this.orderid = this.paymentdetail.masterOrderNo;
        this.invoiceno="1";
            //this.invoiceno = this.paymentdetail.masterOrderId;
        this.currencyno ="764";
        //this.amountno ="000000030000";
            this.amountno = this.formatamount(this.paymentdetail.masterOrderTotalAmount);
        //this.customeremail="kitipoom.se@gmail.com";
        this.customeremail= this.paymentdetail.customerEmailAddress;
        this.paycategoryid="6";
        this.promotionno="";
        this.userdefined1 = "";
        this.userdefined2 = "";
        this.userdefined3 = "";
        this.userdefined4 = "";
        this.userdefined5 = "";

        this.resulturl1 = "http://localhost:4931/Default";
        this.resulturl2 = "xxx"
        this.request3ds ="Y";
        this.hashvalue = this.hashingin(); 

        this.formatamount(this.amountno);
    }
    hashingin(){
      var txt =  this.versionno+this.merchantid+this.paymentdescription+this.orderid+this.invoiceno+this.currencyno+this.amountno+this.customeremail+this.paycategoryid+this.promotionno+this.userdefined1+this.userdefined2+this.userdefined3+this.userdefined4+this.userdefined5+this.resulturl1+this.resulturl2+this.request3ds;  
      var hash = CryptoJS.HmacSHA1(txt, this.secretcode);
       console.log(hash.toString().toUpperCase());
      return hash.toString().toUpperCase();
    }
    hashing(version:any,merchant_id:any,payment_description:any,order_id:any,invoice_no:any,currency:any,amount:any,customer_email:any,pay_category_id:any,promotion:any,user_defined_1:any,user_defined_2:any,user_defined_3:any,user_defined_4:any,user_defined_5:any,result_url_1:any,result_url_2:any,request_3ds:any){
        //console.log(request_3ds);
        var txt = version+merchant_id+payment_description+order_id+invoice_no+currency+amount+customer_email+pay_category_id+promotion+user_defined_1+user_defined_2+user_defined_3+user_defined_4+user_defined_5+result_url_1+result_url_2+request_3ds;
        //console.log(txt);
        var hash = CryptoJS.HmacSHA1(txt, this.secretcode);
        //console.log(hash.toString().toUpperCase());
        //console.log(txt.toUpperCase());
        //this.hashvalue = hash.toString().toUpperCase();
        this.versionno = version;
        this.merchantid =merchant_id;
        this.paymentdescription = payment_description;
        this.orderid = order_id;
        this.invoiceno=invoice_no;
        this.currencyno =currency;
            this.amountno = amount;
        this.customeremail=customer_email;
        this.paycategoryid=pay_category_id;
        this.promotionno=promotion;
        this.userdefined1 = user_defined_1;
        this.userdefined2 = user_defined_2;
        this.userdefined3 = user_defined_3;
        this.userdefined4 = user_defined_4;
        this.userdefined5 = user_defined_5;
        this.resulturl1 = result_url_1;
        this.resulturl2 = result_url_2;
        this.request3ds = request_3ds;
        this.hashvalue = hash.toString().toUpperCase();; 
        
    }
    formatamount(num:any){
        var a = parseInt(num, 10);
        //console.log(a);
        var a = a*100; 
        //console.log(a);
        var b = a+"";
        //console.log(b);
        var len = b.length;
        //console.log(len);    
        for(len;len<12;len++){
            b= '0'+b;
        } 
        console.log(b);   
        return b;
    }
    opshow = false;
    showop(){
       this.opshow=!this.opshow; 
    }
    gotopay(){
            this.router.navigate(['/payment']);
    } 
        createreport() {
        //console.log(this.orderdetail.customerId);
        var nowreport = {
            "masterOrderId": this.paymentdetail.masterOrderId,
            "shippingAddress": this.paymentdetail.shippingAddress,
            "billingAddress": this.paymentdetail.billingAddress,
            "currencyCode": this.paymentdetail.currencyCode,
            "customerEmailAddress": this.paymentdetail.customerEmailAddress,
            "customerId": this.paymentdetail.customerId,
            "customerName": this.paymentdetail.customerName,
            "masterOrderNo": this.paymentdetail.masterOrderNo,
            "orderDateTime": this.paymentdetail.orderDateTime,
            "status": this.paymentdetail.status,
            "isMediaOrder": this.paymentdetail.isMediaOrder,
            "masterOrderSubTotal": this.paymentdetail.masterOrderSubTotal,
            "masterOrderTotal": this.paymentdetail.masterOrderTotal,
            "masterOrderTotalDiscount": this.paymentdetail.masterOrderTotalDiscount,
            "masterOrderTotalShipping": this.paymentdetail.masterOrderTotalShipping,
            "masterOrderTotalVat": this.paymentdetail.masterOrderTotalShipping,
            "masterOrderTotalAmount": this.paymentdetail.masterOrderTotalAmount,
            "createDateTime": this.paymentdetail.createDateTime,
            "updateDateTime": this.paymentdetail.updateDateTime,
            "shippingAddressId": this.paymentdetail.shippingAddressId,
            "paymentStatus": this.paymentdetail.orderPayment.paymentStatus,
            "time": new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear() + "-" + new Date().getHours() + "-" + new Date().getMinutes() + "-" + new Date().getSeconds(),
        }
        var dup =true;
        for(var i = 0,len = this.dayreport.length;i<len;i++){
            if(this.dayreport[i].masterOrderId==nowreport.masterOrderId){
                console.log(nowreport.masterOrderId);
                this.dayreport[i] = nowreport;
                dup =false;
            }
        }
        if(dup){
            console.log(this.paymentdetail.masterOrderId+"new");
            this.dayreport.push(nowreport);
        }
        localStorage.setItem('offlinereport', JSON.stringify(this.dayreport));
    }

}
