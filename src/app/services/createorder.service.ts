import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Config } from '../config.const';

@Injectable()
export class CreateorderService {
    constructor(private http: Http) { }

    list(list:any): any {
        let body = list;
        /*let body = { 
            "data": { 
                "billingAddress": "address for test area for test, City for test, State for test, Thailand, 12345", 
                "currencyCode": "TH", 
                "customerEmailAddress": "bz@b.com", 
                "customerId": "U00000008", 
                "customerName": "bz", 
                "deviceId": "fe52fec2", 
                "isMediaOrder": "N", 
                "mediaTotalAmount": 0.0, 
                "orderList": [ 
                    { 
                        "merchantId": 3, 
                        "orderItemList": [ 
                            { 
                                "orderAttribute": [], 
                                "quantity": 1, 
                                "sku": "M20170003-P0001" 
                            } 
                        ] 
                    } 
                ], 
                "shippingAddress": "address for test area for test, City for test, State for test, Thailand, 12345"
            }, 
            "locale": "th" 
}  ;*/
        return this.http.post(Config.ServiceUrl + '/api/proxy/createOrder ', body)
            .toPromise()
            .then(res => {
                return res.json();
            });
    }
}