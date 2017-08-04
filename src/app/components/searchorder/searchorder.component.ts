import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SearchorderService } from '../../services/searchorder.service';


@Component({
    selector: 'searchorder-component',
    templateUrl: 'searchorder.component.html'
})
export class SearchorderComponent implements OnInit {

    customerdata : any = {};
    customerid:string;
    pagenow = 1;
    totalpage: number = 0;
    numproduct: number = 0;

    constructor(private router: Router,private searchorderService: SearchorderService) {}

    ngOnInit() {
        //this.orderproducts = JSON.parse(sessionStorage.getItem('cart'));
            //var listorder = JSON.parse(sessionStorage.getItem('cartorder'));
           /* this.createorderService.list(listorder)
            .then((data: any) => {
              if (data.result == "SUCCESS") {
                  this.priceorder = data.data;
              }
            });*/
        
        
    }
    ok = false;
    enterid(a:string){
        if(a){
            //console.log(a);
            this.customerid = a;
            this.pagenow = 1;
            this.fideOrder();

            
        }else{
            //console.log("Wrong");
        }
    }
    openproduct(id: any){
        this.router.navigate(['/product', id]);
    }
    open() {
        this.router.navigate(['/payment']);
    }
    openmerchant() {
        this.router.navigate(['/searchmerchant']);
    }
    reloadpage(){
        location.reload();
    }
    openback() {
        if(this.pagenow==1){
            return;
        }
        this.pagenow--;
        this.fideOrder();
    }
    opennext() {
        if(this.pagenow==this.totalpage){
            return;
        }
        this.pagenow++;
        this.fideOrder();
    }
    fideOrder(){
        this.customerdata.masterOrders = [];
        var key = { 
                    "data": { 
                        
                    }, 
                    "page": "1", 
                    "size": "10" 
        };  
        key.data["customerId"] = this.customerid;
        key["page"] = this.pagenow+"";
        sessionStorage.setItem('searchorder',JSON.stringify( key));

        this.searchorderService.list(key)
            .then((data: any) => {
              if (data.result == "SUCCESS") {
                  //console.log(data.data);
                  
                  
                  if( data.data!=null){
                    this.customerdata = data.data;
                    sessionStorage.setItem('searchorderresult',JSON.stringify( this.customerdata));
                    this.totalpage =   this.customerdata.totalPages;
                    this.numproduct =  this.customerdata['masterOrders'].length;
                    this.ok = true; 
                  }
                else{
                    this.ok = false; 
                }
                  //console.log("get");
                  //console.log(this.customerdata);
              }
            });
             
    }
    getmoredetail(c:any){
        sessionStorage.setItem('selectedordercustomer',JSON.stringify(c));
        this.router.navigate(['/customerorderdetail']);
    }
   
}
