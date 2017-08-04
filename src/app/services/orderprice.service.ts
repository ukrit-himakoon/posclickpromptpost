import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Config } from '../config.const';

@Injectable()
export class OrderpriceService {
    constructor(private http: Http) { }

    list(list:any): any {
        let body = list;
        /*let body = { 
            "data": { 
                "isMediaOrder": "N", 
                "mediaTotalAmount": 0, 
                "orderList": [ 
                { 
                    "merchantId": 3, 
                    "orderItemList": [ 
                        { 
                            "quantity": 1, 
                            "sku": "M20170003-P0001" 
                        } 
                    ] 
                } 
                ] 
            }, 
            "locale": "th" 
        } ;*/
        return this.http.post(Config.ServiceUrl + '/api/proxy/calculateOrderPrice ', body)
            .toPromise()
            .then(res => {
                return res.json();
            });
    }
}