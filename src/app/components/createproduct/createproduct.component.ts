import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CreateproductService } from '../../services/createproduct.service';
import { MerchantService } from '../../services/merchant.service';
import { MarketplacecategoryService } from '../../services/marketplacecategory.service';

@Component({
    selector: 'createproduct-component',
    templateUrl: 'createproduct.component.html'
})
export class CreateproductComponent implements OnInit {


    constructor(private router: Router,private createproductService: CreateproductService,private merchantService:MerchantService, private marketplacecategoryService:MarketplacecategoryService) {}
    merchant: any= [];
    marketplace: any= [];
    ngOnInit(){
            this.merchantService.list()
                .then((data: any) => {
                if (data.result == "SUCCESS") {
                  this.merchant = data;
                  sessionStorage.setItem('merchant',JSON.stringify(this.merchant));
                }
            });
            this.marketplacecategoryService.list()
                .then((data: any) => {
                if (data.result == "SUCCESS") {
                  this.marketplace = data.data;
                   sessionStorage.setItem('marketplace',JSON.stringify(this.marketplace));
                }
            });
    }
    name:string = '';
    code:string = '';
    price:number =0;
    marketplacecategorycode:string = '';
    merchantcode:string = '';
    vat:string = '';
    createdby:string = '';

    description:string = '';
    productHeight:number = 0;
    productLength:number =0;
    productWeight:number =0;
    productWidth:number =0;
    manufacturer:string = '';
    tag:string = '';

    errortext = 'please enter your product detail and click CHECK';

    isOk = false;
    makedetail(names:string,codes:string,prices:number,marketplacecategorycodes:string,merchantcodes:string,vats:string,createdbys:string){
        if(names&&codes&&prices&&marketplacecategorycodes&&merchantcodes&&vats&&createdbys){
             console.log(names+codes+prices+marketplacecategorycodes+merchantcodes+vats+createdbys);
             this.name=names;
             this.code=codes;
             this.price=prices;
             this.marketplacecategorycode=marketplacecategorycodes;
             this.merchantcode=merchantcodes;
             this.vat=this.getvat();
             this.createdby=createdbys;
             //console.log(this.vat);
             this.errortext = "Information is OK, please confirm";
             this.isOk=true;
        }
        else{
            console.log("ff");
            this.errortext = "Some space is blank, please enter all information"; 
        }
    }
    makedetailoptional(names:string,codes:string,prices:number,marketplacecategorycodes:string,merchantcodes:string,vats:string,createdbys:string,descriptions:string,productHeights:number,productLengths:number,productWeights:number,productWidths:number,manufacturers:string,tags:string){
            this.isOk=false;
            var pri = this.checkprice(prices);
            if(pri){
                var mercode = this.checkmerchant(merchantcodes);
                if(mercode){
                    var marcode = this.checkmarket(marketplacecategorycodes);
                    if(marcode){
                        //if(true){
                        this.makedetail(names,codes,prices,marketplacecategorycodes,merchantcodes,vats,createdbys);
                        //console.log(descriptions+productHeights+productLengths+productWeights+productWidths+manufacturers); 
                        //this.errortextop = "Information is OK, please confirm";
                        this.description=descriptions;
                        this.productHeight=productHeights;
                        this.productLength=productLengths;
                        this.productWeight=productWeights;
                        this.productWidth=productWidths;
                        this.manufacturer=manufacturers;
                        this.tag=tags;
                        console.log( this.description+this.productHeight+this.productLength+this.productWeight+this.productWidth+this.manufacturer); 
                        if(this.isOk){
                            this.createdetail();                
                        }
                        else{
                            console.log("ff");
                        //this.errortextop = "Some space is blank, please enter all information"; 
                        }
                    }

                }   
            }
    }
    createdetail(){
        var orders = { 
            "data": { 
                "code": "FM61", 
                "name": "Samsung Galaxy J9 ",  
                "defaultPrice": 40000, 
                "merchantCode": "M20170001", 
                "status": "ACTIVE", 
                "createdBy": "pong8889", 
                "vat": "Y",
                "marketplaceCategoryCode" : "MPCAT167", 
                "language": "TH"
            } 
        };
        orders.data["code"] = this.code;
        orders.data["name"] = this.name;
        orders.data["merchantCode"] = this.merchantcode;
        orders.data["createdBy"] = this.createdby;
        orders.data["vat"] = this.vat;
        orders.data["marketplaceCategoryCode"] = this.marketplacecategorycode;
        orders.data["defaultPrice"] = this.price;
        
        if(this.description!=''){
           orders.data["description"] = this.description; 
        }
        if(this.tag!=''){
           orders.data["tags"] = this.tag; 
        }
        if(this.manufacturer!=''){
           orders.data["manufacturer"] = this.manufacturer; 
        }
        if(this.productHeight!=0){
             orders.data["productHeight"] = this.productHeight;
        }
        if(this.productLength!=0){
             orders.data["productLength"] = this.productLength;
        }
        if(this.productWeight!=0){
             orders.data["productWeight"] = this.productWeight;
        }
        if(this.productWidth!=0){
             orders.data["productWidth"] = this.productWidth;
        }
        sessionStorage.setItem('productcreate',JSON.stringify(orders));
    }
    sendedorder: any = {};
    sendata(){
            var listorder = JSON.parse(sessionStorage.getItem('productcreate'));
            this.createproductService.list(listorder)
                .then((data: any) => {
                if (data.result == "SUCCESS") {
                   this.sendedorder = data.data;
                      sessionStorage.setItem('createproductresult',JSON.stringify(this.sendedorder));
                      this.errortext= "create complete." 
                }
            });
    }
    opencreatebtn = false;
    textconfirm ='confirm';
    confirmdata(){
        if(this.isOk){
            this.opencreatebtn = !this.opencreatebtn;
            if(this.opencreatebtn){
                this.textconfirm ='cancel';
            }
            else{
                this.textconfirm ='confirm';
                 this.isOk=false;
                 this.errortext = 'please enter your product detail and click CHECK';
            }
        }
        
    }
        searchproduct(id:number){
        if(!isNaN(id)){
            this.router.navigate(['/detailproduct', id]);
          
        }
        
    }
    checkmerchant(merchantcodes:string){
        for(var j = 0, len = this.merchant.merchantBeanList.length; j < len; j++){
            //console.log(this.merchant.merchantBeanList[j].code);
            if(merchantcodes == this.merchant.merchantBeanList[j].code){
                console.log("OK merchantcode match");
                return true;
            }
        }
                console.log("Fail merchantcode not match"); 
                this.errortext = "merchantcode not match";
                return false;       
    }
    checkmarket(marketplacecategorycodes:string){
        for(var j = 0, len = this.marketplace.marketplaceCategories.length; j < len; j++){
            //console.log(this.marketplace.marketplaceCategories[j].code);
            if(marketplacecategorycodes == this.marketplace.marketplaceCategories[j].code){
                console.log("OK marketplacecategorycodes match");
                return true;
            }
        }
                console.log("Fail marketplacecategorycodes not match"); 
                this.errortext = "marketplacecategorycodes not match";
                return false;    
    }
    checkprice(price:number){
        if(!isNaN(price)){
            return true;
          
        }
        this.errortext = "price is not number";
        return false;
        
    }
    chang = false;
    setvat(){
        this.chang = !this.chang;
    }
    getvat(){
        if(this.chang){
            return "Y";
        }
         return "N";
    }
}