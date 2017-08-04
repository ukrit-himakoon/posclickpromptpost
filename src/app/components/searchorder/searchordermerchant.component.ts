import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { SearchordermerchantService } from '../../services/searchordermerchant.service';


@Component({
    selector: 'searchordermerchant-component',
    templateUrl: 'searchordermerchant.component.html'
})
export class SearchordermerchantComponent implements OnInit {

    customerdata : any = {};
    merchantid:string;
    pagenow = 1;
    totalpage: number = 0;
    numproduct: number = 0;

    constructor(private router: Router,private searchorderService: SearchordermerchantService) {}

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
            this.merchantid = a;
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
        key.data["merchantId"] = this.merchantid;
        key["page"] = this.pagenow+"";
        sessionStorage.setItem('searchorder',JSON.stringify( key));

        this.searchorderService.list(key)
            .then((data: any) => {
              if (data.result == "SUCCESS") {
                  //console.log(data.data);
                  
                  
                  if( data.data!=null){
                    this.customerdata = data.data;
                    sessionStorage.setItem('searchordermerchantresult',JSON.stringify( this.customerdata));
                    this.totalpage =   this.customerdata.totalPages;
                    this.numproduct =  this.customerdata['orders'].length;
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
        sessionStorage.setItem('selectedordermerchant',JSON.stringify(c));
        this.router.navigate(['/merchantorderdetail']);
    }
   
}
