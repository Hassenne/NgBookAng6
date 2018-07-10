import 'rxjs/add/operator/toPromise';
import { Injectable } from "@angular/core";
import { CONFIG } from './../config/config';
import { AuthService } from "./auth.service";
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
//import { Headers, RequestOptions } from '@angular/http'


@Injectable()
export class UserService{
    private headers: HttpHeaders;

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ){
        this.headers = new HttpHeaders({ 'Authorization': 'Bearer'+this.authService.getToken() })
    }

    getUserById(id: number) {
        if (id == this.authService.getAuthUserId()) {
            return this.authService.getAuthUser()
        }

        let options = new HttpRequest({ headers: this.headers }) 

        return this.http.get(CONFIG.API_URL+'/user/'+id, options)
                        .toPromise()
                        .then((response) => console.log(response))
    }
}