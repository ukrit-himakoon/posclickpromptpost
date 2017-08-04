import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'homepage-component',
    templateUrl: 'homepage.component.html'
})
export class HomepageComponent implements OnInit {

    products: any=[];
    orderproducts: any[];
    homeId: any;
    numproduct= 0;
    randomedproduct:any ={};

    viewtable = this.app.viewtable;
    changeview(){
        this.viewtable = this.app.changeview();
    }
    //constructor(private router: Router) { }

    constructor(private productService: ProductService, private router: Router,private activatedRoute: ActivatedRoute,private app:AppComponent) {}

    ngOnInit() {
        this.numproduct = this.app.cartvalue;
        this.activatedRoute.params.subscribe((params: Params) => {
        this.homeId = params['id'];
      });
        this.orderproducts = JSON.parse(sessionStorage.getItem('cart'));
        this.productService.list(this.homeId,10)
          .then((data: any) => {
              if (data.result == "SUCCESS") {
                  this.products = data.data;
                  this.productrandom();
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
        this.router.navigate(['/product', 1]);
    }
    openproduct(id: any){
        this.router.navigate(['/product', id]);
    }
    opencart(){
        this.router.navigate(['/order']);
    }
    opennext() {
        this.router.navigate(['/home', ++this.homeId]);
        //location.reload();
        this.productService.list(this.homeId,10)
          .then((data: any) => {
              if (data.result == "SUCCESS") {
                  console.log("ss");
                  if(data.data!=null){
                    this.products = data.data;
                    this.productrandom();
                  }
                else{
                    this.openback();
                }

              }
            });
        //var page = ++this.homeId
        //window.open("http://localhost:4200/home/"+page,"_self")
    }
    openback() {
        if(this.homeId==1){
            return;
        }
        this.router.navigate(['/home', --this.homeId]);
        //location.reload();
        this.productService.list(this.homeId,10)
          .then((data: any) => {
              if (data.result == "SUCCESS") {
                  if(data.data!=null){
                    this.products = data.data;
                    this.productrandom();
                  }
              }
            });
        //var page = --this.homeId
        //window.open("http://localhost:4200/home/"+page,"_self")
    }
    searchproduct(id:any){
        if(!isNaN(id)){
            this.router.navigate(['/product', id]);
        }
    }
    pronew = false;
    isnewproduct(){
        if(this.pronew){
            this.pronew = false;
            return true;
        }
        return false;
    }
    productrandom(){
        var num = Math.floor((Math.random()*this.products.length));
         console.log(num);
        this.randomedproduct = this.products[num];
    }
}
