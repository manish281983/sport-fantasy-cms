
import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {StorageSrvc} from './storage.service';

@Injectable()
export class APISrvc {
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http, private storageSrvc: StorageSrvc) {
    }

    getData(url: string, param?: object): Observable<any> {
        const options = {
            params: param || {}
        };
        return this.http.get(url, options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    searchData(url: string, param: any): Observable<any> {
        const params: URLSearchParams = new URLSearchParams();
        for (let key in param) {
            if (param.hasOwnProperty(key)) {
                params.set(key, param[key]);
            }
        }
        this.options = new RequestOptions({search: params});
        return this.http.get(url, this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    postData(url: string, param?: object): Observable<any> {
        param = JSON.stringify(param) || {};
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'sm_user': this.storageSrvc.getData('sso')
        });
        this.options = new RequestOptions({
            headers: this.headers
        });
        return this.http
            .post(url, param, this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    deleteData(url: string, param?: object): Observable<any> {
        param = JSON.stringify(param) || {};
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'sm_user': this.storageSrvc.getData('sso')
        });
        this.options = new RequestOptions({
            headers: this.headers,
            body: param
        });
        return this.http
            .delete(url, this.options)
            .map((res: Response) => res)
            .catch(this.handleError);
    }

    putData(url: string, param?: object): Observable<any> {
        param = JSON.stringify(param) || {};
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'sm_user': this.storageSrvc.getData('sso')
        });
        this.options = new RequestOptions({
            headers: this.headers
        });
        return this.http
            .put(url, param, this.options)
            .map((res: Response) => res.json())
            .catch(this.handleError);
    }

    handleError = (res: Response) => {
        if (res && res.status === 401) {
            if (this.storageSrvc.getData('sessionExpire') === 'active') {
                alert("Session timed out. Logging out of the application. Please login again to continue.");
                this.storageSrvc.setData('sessionExpire', 'expired');
                window.location.href = "/logout";
            }
        }
        return Observable.throw(res);
    }

}
