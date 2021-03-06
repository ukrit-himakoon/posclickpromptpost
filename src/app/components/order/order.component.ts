import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderpriceService } from '../../services/orderprice.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'order-component',
    templateUrl: 'order.component.html'
})
export class OrderComponent implements OnInit {

    products: any[];
    orderproducts: any[];
    groupproduct: any = [];
    priceorder: any = {};
    numproduct = 0;

    //constructor(private router: Router) { }

    constructor(private router: Router, private orderpriceService: OrderpriceService, private app: AppComponent) { }

    ngOnInit() {
        this.numproduct = this.app.cartvalue;
        this.orderproducts = JSON.parse(sessionStorage.getItem('cart'));
        this.priceorder.masterOrderSubTotal = 0;
        this.products = this.orderproducts;
        this.groupingorder();
        if (this.products != null) {
            this.calculatePrice();
            var listorder = JSON.parse(sessionStorage.getItem('cartorder'));
            this.orderpriceService.list(listorder)
                .then((data: any) => {
                    if (data.result == "SUCCESS") {
                        this.priceorder = data.data;
                    }
                });
        }


    }
    addpic(c: any): any {
        if (c.images != undefined) {
            if (c.images[0].imgPath == null) {
                c.images[0].imgPath = "https://benetis.me/images/2017/02/Screen-Shot-2017-02-11-at-15.02.26.png"
            }
            return c.images[0].imgPath;
        }
        return "https://benetis.me/images/2017/02/Screen-Shot-2017-02-11-at-15.02.26.png";

    }
    openproduct(id: any) {
        this.router.navigate(['/product', id]);
    }
    calculatePrice() {
        /*var orders = { 
            "data": { 
                "isMediaOrder": "N", 
                "mediaTotalAmount": 0, 
                "orderList": [ 
                    { 
                        "merchantId": 3, 
                        "orderItemList": [ 
                            { 
                                "quantity": 1, 
                                "sku": "M20170003-P0001" 
                            } 
                        ] 
                    } 
                ] 
            }, 
            "locale": "th" 
        } ;*/
        var orders = {
            "data": {
                "isMediaOrder": "N",
                "mediaTotalAmount": 0,

            },
            "locale": "th"
        };
        var orederist = [
            /*{ 
                    "merchantId": 3, 
                    "orderItemList": [ 
                            { 
                                "quantity": 0, 
                                "sku": "M20170003-P0001" 
                            } 
                        ] 
                    } */
        ];
        /*var j = 0, len = 0;
        for (j = 0, len = this.products.length; j < len; j++) {
            //console.log(this.products[j].merchantId+"!"+j+"!!"+len);
            //console.log(this.products[j].merchantId);
            var b = true;
            for (var i = 0, len1 = orederist.length; i < len1; i++) {
                // console.log(orederist[0].merchantId);
                //console.log(this.products[j].merchantId+"/"+orederist[i].merchantId);
                if (this.products[j].merchantId == orederist[i].merchantId) {
                    b = false;
                    var b1 = true;
                    for (var k = 0, len2 = orederist[i].orderItemList.length; k < len2; k++) {
                        //console.log(this.products[j].rProductDetails[0].sku+"/"+orederist[i].orderItemList[k].sku);
                        if (this.products[j].sku == orederist[i].orderItemList[k].sku) {
                            b1 = false;
                            orederist[i].orderItemList[k].quantity += 1;
                        }
                    }
                    if (b1) {
                        orederist[i].orderItemList.push(
                            {
                                "quantity": 1,
                                "sku": this.products[j].sku
                            }
                        );
                    }
                }
            }


            if (b) {
                //console.log("!"+j+"!!");
                orederist.push({
                    "merchantId": this.products[j].merchantId,
                    "orderItemList": [
                        {
                            "quantity": 1,
                            "sku": this.products[j].sku
                        }
                    ]
                });
            }
        }*/
        //console.log("!"+j+"!!");
        //for (var i = 0, len = orederist.length; i < len; i++) {
        //console.log(orederist[i].merchantId);
        //}
        var j = 0, len = 0;
        for (j = 0, len = this.groupproduct.length; j < len; j++) {
            var b = true;
            for (var i = 0, len1 = orederist.length; i < len1; i++) {
                if (this.groupproduct[j].merchantId == orederist[i].merchantId) {
                    b = false;
                    orederist[i].orderItemList.push(
                        {
                            "quantity": this.groupproduct[j].qt,
                            "sku": this.groupproduct[j].sku
                        });
                }
            }
            if (b) {
                orederist.push({
                    "merchantId": this.groupproduct[j].merchantId,
                    "orderItemList": [
                        {
                            "quantity": this.groupproduct[j].qt,
                            "sku": this.groupproduct[j].sku
                        }
                    ]
                });
            }
        }

        orders.data['orderList'] = orederist;
        sessionStorage.setItem('cartorder', JSON.stringify(orders));
    }
    open() {
        if (this.numproduct > 0) {
            //this.router.navigate(['/createorder']);
            this.router.navigate(['/personaldetail']);
        }
    }
    delete(c: any) {
        //console.log("any go");
        var id = c.sku;
        console.log(id);
        var newproducts = [];
        for (var j = 0, len = this.products.length; j < len; j++) {
            if (this.products[j].sku == id) {
                console.log(id);
                id = -1;
            }
            else {
                newproducts.push(this.products[j]);
            }

        }
        sessionStorage.setItem('cart', JSON.stringify(newproducts));
        //location.reload();
        this.refreshpage();
    }
    deletesku(c: any) {
        //console.log("any go");
        var id = c.sku;
        console.log(id);
        var newproducts = [];
        for (var j = 0, len = this.products.length; j < len; j++) {
            if (this.products[j].sku == id) {

            }
            else {
                newproducts.push(this.products[j]);
            }

        }
        sessionStorage.setItem('cart', JSON.stringify(newproducts));
        //location.reload();
        this.refreshpage();
    }
    removeitem(c: any) {
        if (c.qt > 1) {
            this.delete(c);
        }
    }
    additem(c: any) {
        //console.log("any go");
        var id = c.sku;
        console.log(id);
        var newproducts = [];
        for (var j = 0, len = this.products.length; j < len; j++) {
            if (this.products[j].sku == id) {
                console.log(id);
                newproducts.push(this.products[j]);
                id = -1;
            }
            newproducts.push(this.products[j]);

        }
        sessionStorage.setItem('cart', JSON.stringify(newproducts));
        //location.reload();
        this.refreshpage();
    }
    deleteall() {
        sessionStorage.removeItem('cart');
        //location.reload();
        this.refreshpage();
    }
    refreshpage() {
        this.app.checkCartvalue();
        this.orderproducts = JSON.parse(sessionStorage.getItem('cart'));
        this.priceorder.masterOrderSubTotal = 0;
        this.products = this.orderproducts;
        if (this.products != null) {
            this.groupingorder();
            this.calculatePrice();
            var listorder = JSON.parse(sessionStorage.getItem('cartorder'));
            this.orderpriceService.list(listorder)
                .then((data: any) => {
                    if (data.result == "SUCCESS") {
                        this.priceorder = data.data;
                    }
                });
        }
        this.numproduct = this.app.cartvalue;
    }
    reloadpage() {
        location.reload();
    }
    backtohome() {
        this.router.navigate(['/']);
    }
    groupingorder() {
        this.groupproduct = [];
        this.products
        for (var j = 0, len = this.products.length; j < len; j++) {
            var b = true;
            for (var i = 0, len1 = this.groupproduct.length; i < len1; i++) {
                if (this.products[j].sku == this.groupproduct[i].sku) {
                    b = false;
                    this.groupproduct[i].qt += 1;
                }
            }
            if (b) {
                var pd = this.products[j];
                pd['qt'] = 1;
                this.groupproduct.push(pd);
            }
        }
        sessionStorage.setItem('gcart', JSON.stringify(this.groupproduct));
    }
}
