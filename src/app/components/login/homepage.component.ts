import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params  } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
    selector: 'homepage-component',
    templateUrl: 'homepage.component.html'
})
export class HomepageComponent implements OnInit {

    products: any=[];
    orderproducts: any[];
    homeId: any;
    viewtable = true;
    changeview(){
        this.viewtable = !this.viewtable;
    }
    //constructor(private router: Router) { }

    constructor(private productService: ProductService, private router: Router,private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
        this.homeId = params['id'];
      });
        this.orderproducts = JSON.parse(sessionStorage.getItem('cart'));
        this.productService.list(this.homeId,10)
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
                  this.products = data.data;
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
                  this.products = data.data;
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
}
