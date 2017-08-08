import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderdetailService } from '../../services/orderdetail.service';
import { AppComponent } from '../../app.component';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
    selector: 'payment-component',
    templateUrl: 'payment.component.html'
})

export class PaymentComponent implements OnInit {
    paymentdetail: any = {};
    orderdetail: any = {};
    sendedorder: any = {};
    dayreport: any = [];
    statuspay = '';
    constructor(private router: Router, private orderdetailService: OrderdetailService, private app: AppComponent) { }

    ngOnInit() {
        if (sessionStorage.getItem('createorderresult') != null) {
            if(localStorage.getItem('offlinereport')!=null){
                this.dayreport = JSON.parse(localStorage.getItem('offlinereport'));
            }
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
                        sessionStorage.setItem('ordersummary', JSON.stringify(this.sendedorder));
                        this.orderdetail = this.sendedorder;
                        this.statuspay = this.orderdetail.orderPayment.paymentStatus;
                        this.createreport();
                        if (this.statuspay == 'PAID') {
                            sessionStorage.removeItem('cart');
                        }
                    }
                });
        }
        else {
            this.router.navigate(['/']);
        }
    }
    checkpaystatus() {
        if (this.statuspay == 'WAITING') {
            return true;
        }
        return false;
    }
    gotopay() {
        this.router.navigate(['/createpayment']);
    }
    reloadpage() {
        location.reload();
    }
    reportprint() {
        /*var str = "customerid:" + this.orderdetail.customerId+
                " Name: " + this.orderdetail.customerName+
                " Email:" + this.orderdetail.customerEmailAddress+
                " BillingAddress:" + this.orderdetail.billingAddress+
                " ShippingAddress:" + this.orderdetail.shippingAddress+
                " Date:" + this.orderdetail.createDateTime+
                " OrderId:"+ this.orderdetail.masterOrderId


        var blob = new Blob([ str], {type: "text/plain;charset=utf-8"});
        FileSaver.saveAs(blob, "hello world.txt");*/
        
       
        this.exportAsExcelFile(this.dayreport, "report");
    }
    public exportAsExcelFile(json: any[], excelFileName: string): void {
        if (json != null) {
            //console.log(JSON.stringify(json));
            
            var b = json;
            //b =[{"b":1},{"b":2}];
            //console.log(JSON.stringify(b));
            //a.push(JSON.stringify(b));
            const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(b);
            const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
            const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
            this.saveAsExcelFile(excelBuffer, excelFileName);
        }

    }

    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }
    createreport(){
        //console.log(this.orderdetail.customerId);
        var nowreport = {
                "masterOrderId": this.orderdetail.masterOrderId,
                "shippingAddress": this.orderdetail.shippingAddress,
                "billingAddress":this.orderdetail.billingAddress,
                "currencyCode": this.orderdetail.currencyCode,
                "customerEmailAddress": this.orderdetail.customerEmailAddress,
                "customerId":this.orderdetail.customerId,
                "customerName": this.orderdetail.customerName,
                "masterOrderNo": this.orderdetail.masterOrderNo,
                "orderDateTime": this.orderdetail.orderDateTime,
                "status":this.orderdetail.status,
                "isMediaOrder":this.orderdetail.isMediaOrder,
                "masterOrderSubTotal":this.orderdetail.masterOrderSubTotal,
                "masterOrderTotal":this.orderdetail.masterOrderTotal,
                "masterOrderTotalDiscount":this.orderdetail.masterOrderTotalDiscount,
                "masterOrderTotalShipping":this.orderdetail.masterOrderTotalShipping,
                "masterOrderTotalVat": this.orderdetail.masterOrderTotalShipping,
                "masterOrderTotalAmount":this.orderdetail.masterOrderTotalAmount,
                "createDateTime":this.orderdetail.createDateTime,
                "updateDateTime":this.orderdetail.updateDateTime,
                "shippingAddressId":this.orderdetail.shippingAddressId,
        }
        this.dayreport.push(nowreport);
         localStorage.setItem('offlinereport', JSON.stringify(this.dayreport));
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