import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Config } from '../config.const';

@Injectable()
export class CreateproductService {
    constructor(private http: Http) { }

    list(list:any): any {
        let body = list;
        /*let body = { 
            "data": { 
            "code": "FM61", 
            "name": "Samsung Galaxy J9 ", 
            "description": "Product details of Samsung Galaxy J9", 
            "defaultPrice": 40000, 
            "manufacturer": "CCCC", 
            "merchantCode": "M20170001", 
            "status": "ACTIVE", 
            "tags": "#Samsung", 
            "productHeight": 7.2, 
            "productLength": 5, 
            "productWeight": 2.5, 
            "productWidth": 0.5, 
            "createdBy": "pong8889", 
            "vat": "Y",
            "marketplaceCategoryCode" : 2, 
            "language": "TH"
        } 
}  ;*/
        return this.http.post(Config.ServiceUrl + '/api/product/createProduct ', body)
            .toPromise()
            .then(res => {
                return res.json();
            });
    }
}