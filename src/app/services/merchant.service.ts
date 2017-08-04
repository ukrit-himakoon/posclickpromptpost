import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Config } from '../config.const';

@Injectable()
export class MerchantService {
    constructor(private http: Http) { }

    list(): any {
        let body = {
	        "pageNo" : 1,
	        "pageSize" : 10,
            "locale" : "en"
    };
        return this.http.post(Config.ServiceUrl + '/api/merchant/findAllMerchant', body)
            .toPromise()
            .then(res => {
                return res.json();
            });
    }
}