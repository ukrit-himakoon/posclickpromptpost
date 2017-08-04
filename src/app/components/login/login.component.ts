import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'login-component',
    templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
    constructor() { }
    merchants = false;
    ngOnInit() {
    }
    merchantlogin(username:any,passsword:any){
        if(username&&passsword){
            console.log("login merchant"+username+" "+passsword);
        }
        
    }
    userlogin(username:any,passsword:any){
        if(username&&passsword){
            console.log("login user"+username+" "+passsword);
            
        }
        
    }
    openmerchantlogin(){
        this.merchants = !this.merchants;
    }
}
