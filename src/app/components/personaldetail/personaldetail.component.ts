import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppComponent } from '../../app.component';

@Component({
    selector: 'personaldetail-component',
    templateUrl: 'personaldetail.component.html'
})
export class PersonaldetailComponent implements OnInit {

    orderproducts: any[];
    priceorder: any = {};
    textresult = '';

    //constructor(private router: Router) { }

    constructor(private router: Router, private app: AppComponent) { }


    ngOnInit() {



    }
    generateText(f: string, l: string, ad: string, ar: string, ci: string, st: string, co: string, zi: string, tel: string, fa: string, e: string) {
        if (f && l && ad && ar && ci && st && co && zi && tel && fa && e) {
            if (!this.numberFormat(zi)) {
                this.textresult = "Zip code value is incorrect, please enter again ";
                return;
            }
            if (!this.numberFormat(tel)) {
                this.textresult = "Telephone value is incorrect, please enter again ";
                return;
            }
            if (!this.numberFormat(fa)) {
                this.textresult = "Fax value is incorrect, please enter again ";
                return;
            }
            if (!this.mailFormat(e)) {
                this.textresult = "Email is incorrect, please enter again ";
                return;
            }
            var Addressd = f + " " + l + " " + ad + " " + ar + " " + ci + " " + st + " " + co + " " + zi + " " + tel + " " + fa + " " + e;
            console.log(Addressd);
            this.textresult = Addressd;
            var addressformat = {
                "firstName": f,
                "lastName": l,
                "addressDetail1": ad,
                "addressDetail2": ar,
                "city": ci,
                "state": st,
                "country": co,
                "postCode": zi,
                "fax": fa,
                "telephone": tel,
                "email": e,
            }
            sessionStorage.setItem('addressdata', JSON.stringify(addressformat));
            this.router.navigate(['/createorder']);
        }
        else {
            this.textresult = "Some space is blank, please enter all information";
        }
    }
    mailFormat(control: String) {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

        if (control != "" && (EMAIL_REGEXP.test(control.toString()))) {
            return true;
        }
        return false;

    }
    numberFormat(control: String) {
        var NUMBER_REGEXP = /^[0-9-]+$/g;

        if (control != "" && (NUMBER_REGEXP.test(control.toString()))) {
            return true;
        }
        return false;

    }
}
