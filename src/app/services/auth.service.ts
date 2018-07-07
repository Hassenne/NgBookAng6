import { CONFIG } from './../config/config';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './../classes/User';
import { UserData } from './../classes/UserData';

@Injectable()
export class AuthService {

    constructor (private http: HttpClient, private router: Router) {}

    register (name: string, email: string, password: string): Promise<UserData> {
        
        return this.http.post<any>(CONFIG.API_URL+'/register', {name: name, email: email, password: password})
                     
                        .toPromise()
                        .then( (response) => {

                            let token = response.token

                            let user = response.user.data


                            let userData = new UserData(token, user)

                            
                             return userData

                            }
                        )
                        
    }

    login(email: string, password: string): Promise<UserData> {

        return this.http.post<any>(CONFIG.API_URL+'/authenticate',{email: email, password: password})
                        .toPromise()
                        .then((response) => {
                            let token = response.token

                            let user = response.user.data

                            let userData = new UserData(token, user)

                            return userData

                        })

    }

    loguserIn(userData: UserData):void {
        
        localStorage.setItem('token', userData.token);

        localStorage.setItem('user', JSON.stringify(userData.user))

        this.router.navigate(['/dashboard'])
    }
}