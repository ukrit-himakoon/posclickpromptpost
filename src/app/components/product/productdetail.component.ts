import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DetailproductService } from '../../services/detailproduct.service';
import { AppComponent } from '../../app.component';

@Component({
    selector: 'productdetail-component',
    templateUrl: 'productdetail.component.html'
})
export class ProductdetailComponent implements OnInit {
    product: any = {};
    userId: any;
    quantity = 1;
    searchms ='';
    found = false;
    //constructor(private router: Router) { }

    constructor(private productService: DetailproductService, private router: Router,private activatedRoute: ActivatedRoute,private app:AppComponent) {}

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
        this.userId = params['id'];
      });
        this.productService.list(this.userId)
          .then((data: any) => {
              if (data.result == "SUCCESS") {
                  this.product = data.data;
                  this.found = true;
              }
                else{
                     this.searchms ='not found';
                     this.found = false;
                }            
            });
    }
    addpic(): any{
        if(this.product.images != undefined){
            if(this.product.images[0].imgPath==null){ 
                    this.product.images[0].imgPath="https://benetis.me/images/2017/02/Screen-Shot-2017-02-11-at-15.02.26.png"
            }
            return this.product.images[0].imgPath;
        }
         return "https://benetis.me/images/2017/02/Screen-Shot-2017-02-11-at-15.02.26.png";   

    }

    addproduct(){
        var b = [];
        if(sessionStorage.getItem('cart')!= null){
            b = JSON.parse(sessionStorage.getItem('cart'));
           
        }
         //b.push({"id": this.product.id});
         while(this.quantity>0){
             b.push(this.product);
             this.quantity--;
         }
        
         sessionStorage.setItem('cart',JSON.stringify(b));
         this.app.checkCartvalue();
         //this.router.navigate(['/']);
         this.quantity=1;
    }
    increaseproduct(){
        this.quantity++;
    }
    decreaseproduct(){
        if(this.quantity>1){
            this.quantity--;
        }
    }
    addProductDetails(){
        if(this.product.rProductDetails != undefined){
            return this.product.rProductDetails[0];
        }
    }
    searchproduct(id:number){
        if(!isNaN(id)){
            this.router.navigate(['/detailproduct', id]);
            this.productService.list(id)
            .then((data: any) => {
              if (data.result == "SUCCESS") {
                  this.product = data.data;
                  this.found = true;
              }
            else{
                this.searchms = "not found";
            }
            });
        }
        
    }
    gotocreate(){
        this.router.navigate(['/newproduct']);
    }
}
