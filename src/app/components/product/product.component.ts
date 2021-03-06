import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DetailproductService } from '../../services/detailproduct.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'product-component',
    templateUrl: 'product.component.html'
})
export class ProductComponent implements OnInit {
    product: any = {};
    selp: any = {};
    userId: any;
    quantity = 1;
    searchms = '';
    found = false;
    ssku = '';
    sop = '';
    sprice = 0;
    selectedValue = '';
    colors = '#000000';
    myStyle = { 'background-color': 'blue' };
    //constructor(private router: Router) { }

    constructor(private productService: DetailproductService, private router: Router, private activatedRoute: ActivatedRoute, private app: AppComponent) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.userId = params['id'];
        });
        this.productService.list(this.userId)
            .then((data: any) => {
                if (data.result == "SUCCESS") {
                    this.product = data.data;
                    this.found = true;
                    if (this.product.rProductDetails.length > 1) {
                        this.colors = this.product.rProductDetails[0].productDetailOptionAndValueList[0].productOptionValueBean.value;
                    }
                    this.ssku = this.product.rProductDetails[0].sku;
                    this.sprice = this.product.rProductDetails[0].optionPrice || 0;
                    this.selp = this.product.rProductDetails[0];
                    //this.sop = this.product.rProductDetails[0].productDetailOptionAndValueList[0].productOptionValueBean.code;
                    //console.log(this.ssku);
                    sessionStorage.setItem('product', JSON.stringify(this.product));
                }
                else {
                    this.searchms = 'not found';
                    this.found = false;
                }
            });
    }
    addpic(): any {
        if (this.product.images != undefined) {
            if (this.product.images[0].imgPath == null) {
                this.product.images[0].imgPath = "https://benetis.me/images/2017/02/Screen-Shot-2017-02-11-at-15.02.26.png"
            }
            return this.product.images[0].imgPath;
        }
        //return "https://benetis.me/images/2017/02/Screen-Shot-2017-02-11-at-15.02.26.png";
        return "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

    }

    addproduct() {
        console.log(this.ssku);
        var b = [];
        if (sessionStorage.getItem('cart') != null) {
            b = JSON.parse(sessionStorage.getItem('cart'));

        }
        //b.push({"id": this.product.id});
        //  while(this.quantity>0){
        //      b.push(this.product);
        //  }

        for (var i = 0; i < this.quantity; i++) {
            var pd = this.product;
            pd["sku"] = this.ssku;
            pd["opprice"] = this.sprice;
            b.push(pd);
        }

        sessionStorage.setItem('cart', JSON.stringify(b));
        this.app.checkCartvalue();
        //this.router.navigate(['/']);
        //  window.history.back();
    }
    increaseproduct() {
        
        if (this.quantity < 10) {
            this.quantity++;
        }
    }
    decreaseproduct() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }
    searchproduct(id: any) {
        if (!isNaN(id)) {
            this.router.navigate(['/product', id]);
            this.productService.list(id)
                .then((data: any) => {
                    if (data.result == "SUCCESS") {
                        this.product = data.data;
                        this.found = true;
                    }
                    else {
                        this.searchms = "not found";
                    }
                });
        }
        if (id == "detail") {
            this.router.navigate(['/detailproduct', this.userId]);
        }

    }
    selectOption(d: any) {
        // console.log(d.sku);
        //this.ssku = d.sku;
        //this.sop = d.productDetailOptionAndValueList[0].productOptionValueBean.code;
        //console.log(this.ssku);
        console.log(d);
    }

    selectOption1() {
        // console.log(d.sku);
        this.ssku = this.selp.sku;
        this.sprice = this.selp.optionPrice;
        this.sop = this.selp.productDetailOptionAndValueList[0].productOptionValueBean.code;
        this.colors = this.selp.productDetailOptionAndValueList[0].productOptionValueBean.value;
        console.log(this.ssku);
        console.log(this.sprice);
        console.log(this.sop);
    }
    getColor(d: any){
        return d.productDetailOptionAndValueList[0].productOptionValueBean.value;
    }
    checkselect(d: any) {
        if (this.ssku == d.sku) {
            return true;
        }
        return false;
    }
}
