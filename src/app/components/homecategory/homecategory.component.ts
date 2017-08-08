import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { DetailproductService } from '../../services/detailproduct.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'homecategory-component',
    templateUrl: 'homecategory.component.html'
})
export class HomecategoryComponent implements OnInit {

    products: any = [];
    orderproducts: any[];
    sortproduct: any = [];
    categoryselect: any = [];
    homeId: any = 1;
    se: any = '';
    numproduct = 0;
    randomedproduct: any = {};

    viewtable = this.app.viewtable;
    changeview() {
        this.viewtable = this.app.changeview();
    }
    //constructor(private router: Router) { }

    constructor(private productService: ProductService, private productDetailService: DetailproductService, private router: Router, private activatedRoute: ActivatedRoute, private app: AppComponent) { }

    ngOnInit() {
        console.log("gogo");
        this.numproduct = this.app.cartvalue;
        this.orderproducts = JSON.parse(sessionStorage.getItem('cart'));
        this.categoryselect = JSON.parse(sessionStorage.getItem('catagory'));
        this.productService.list(this.homeId, 1000)
            .then((data: any) => {
                if (data.result == "SUCCESS") {
                    this.activatedRoute.params.forEach((params: Params) => {
                        let code: any = params['code'];
                        if (code && code != 'ALL') {
                            this.products = data.data.filter((p: any) => {
                                return p.marketplaceCategoryCode == code;
                            });
                        }
                        else {
                            this.products = data.data;
                        }
                    });
                }
            });
    }
    pressnullpic(pic: any): any {
        //console.log("gogo");
        if (pic == null) {
            //pic="http://www.john-james-andersen.com/wp-content/uploads/nullimage1.gif"
            pic = "https://benetis.me/images/2017/02/Screen-Shot-2017-02-11-at-15.02.26.png";
        }
        return pic;

    }
    findsort(code: any) {
        this.sortproduct = [];
        this.se = code;
        for (var j = 0, len = this.products.length; j < len; j++) {
            //console.log(this.products[j].marketplaceCategoryCode);
            if (this.se == this.products[j].marketplaceCategoryCode) {
                this.sortproduct.push(this.products[j]);
            }
        }
        this.productrandom();
    }
    updatesort() {
        this.categoryselect = JSON.parse(sessionStorage.getItem('catagory'));
        if (this.categoryselect.code != this.se) {
            this.findsort(this.categoryselect.code);
        }
    }
    addproduct(p: any) {
        let b: any[] = [];
        if (sessionStorage.getItem('cart') != null) {
            b = JSON.parse(sessionStorage.getItem('cart'));
        }
        this.productDetailService.list(p.id)
            .then((data: any) => {
                if (data.result == "SUCCESS") {
                    var pd = data.data;
                    pd["sku"]=  pd.rProductDetails[0].sku;
                    pd["opprice"]=  pd.rProductDetails[0].optionPrice||0;
                    b.push(pd);
                    sessionStorage.setItem('cart', JSON.stringify(b));
                    this.app.checkCartvalue();
                }
            });
    }
    openproduct(e: any, id: any) {
        if (e.target.tagName != 'BUTTON') {
            this.router.navigate(['/product', id]);
        }
    }
    opencart() {
        this.router.navigate(['/order']);
    }
    searchproduct(id: any) {
        if (id) {
            this.findsort(id);
            this.categoryselect = JSON.parse(sessionStorage.getItem('catagory'));
        }
        else {
            this.sortproduct = this.products;
            console.log("not input");
        }

    }
    productrandom() {
        var num = Math.floor((Math.random() * this.sortproduct.length));
        console.log(num);
        this.randomedproduct = this.sortproduct[num];
    }
}
