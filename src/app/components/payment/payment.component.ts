import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { OrderdetailService } from '../../services/orderdetail.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'payment-component',
    templateUrl: 'payment.component.html'
})

export class PaymentComponent implements OnInit {
    paymentdetail: any = {};
    orderdetail: any = {};
    sendedorder: any = {};
    statuspay = '';
    constructor(private router: Router,private orderdetailService: OrderdetailService,private app:AppComponent) {}

    ngOnInit() {
        if(sessionStorage.getItem('createorderresult')!=null){
                this.paymentdetail = JSON.parse(sessionStorage.getItem('createorderresult'));
                console.log("refresh");
                var listorder = 
                { 
                    "data": { 
                        "masterOrderId": this.paymentdetail.masterOrderId
                    }
                } 
                this.orderdetailService.list(listorder)
                    .then((data: any) => {
                    if (data.result == "SUCCESS") {
                        this.sendedorder = data.data;
                        sessionStorage.setItem('createorderresult',JSON.stringify(this.sendedorder));
                        this.orderdetail = this.sendedorder;
                        this.statuspay = this.orderdetail.orderPayment.paymentStatus;
                        if(this.statuspay=='PAID'){
                            sessionStorage.removeItem('cart');
                        }
                    }
                });
            }
            else{
                this.router.navigate(['/']);
            }
    }
        checkpaystatus(){
            if(this.statuspay=='WAITING' ){
                return true;
            }
            return false;
        }
        gotopay(){
            this.router.navigate(['/createpayment']);
        }    
        reloadpage(){
        location.reload();
    }    
}

 /* if(sessionStorage.getItem('cart')!=null&&sessionStorage.getItem('cartorder')!=null){
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
                }
            });
        }
        else{
            if(sessionStorage.getItem('createorderresult')!=null){
                this.paymentdetail = JSON.parse(sessionStorage.getItem('createorderresult'));
                console.log("refresh");
            }
            else{
                this.router.navigate(['/']);
            }
        }*/