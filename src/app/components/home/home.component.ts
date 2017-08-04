import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

    products: any= [];
    orderproducts: any[];
    viewtable = this.app.viewtable;
    changeview(){
        this.viewtable = this.app.changeview();
    }
    //constructor(private router: Router) { }

    constructor(private productService: ProductService, private router: Router,private app:AppComponent) {}

    ngOnInit() {
        this.orderproducts = JSON.parse(sessionStorage.getItem('cart'));
        this.productService.list(1,10)
          .then((data: any) => {
              if (data.result == "SUCCESS") {
                  this.products = data.data;
              }
            });
    }
    pressnullpic(pic:any):any{
        //console.log("gogo");
            if(pic==null){ 
                    //pic="http://www.john-james-andersen.com/wp-content/uploads/nullimage1.gif"
                    pic = "https://benetis.me/images/2017/02/Screen-Shot-2017-02-11-at-15.02.26.png";
            }
            return pic;
        
    }

    open() {
        this.router.navigate(['/home', 1]);
    }
    openproduct(id: any){
        this.router.navigate(['/product', id]);
    }
    opencart(){
        this.router.navigate(['/order']);
    }
    opennext() {
        this.router.navigate(['/home', 2]);
    }
    searchproduct(id:any){
        if(!isNaN(id)){
            this.router.navigate(['/product', id]);
        }
    }
}
