import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Config } from '../config.const';

@Injectable()
export class MarketplacecategoryService {
    constructor(private http: Http) { }

    list(): any {
        let body = {
	        "data": {

	        },
	        "locale": "",
	        "roleId": "",
	        "roleName": "",
	        "securityKey": "",
	        "userId": "",
	        "userIpAddress": "",
	        "username": ""
        };
        return this.http.post(Config.ServiceUrl + '/api/marketplacecategory/searchAllCategory', body)
            .toPromise()
            .then(res => {
                return res.json();
            });
    }
}