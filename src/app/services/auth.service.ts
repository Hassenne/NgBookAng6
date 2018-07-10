import { CONFIG } from './../config/config';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from './../classes/User';
import { UserData } from './../classes/UserData';
import { NotifyService } from './notify.service';

@Injectable()
export class AuthService {

    constructor (private http: HttpClient, private router: Router, private notifyService: NotifyService) {}

    getAuthUser(): User {
        return JSON.parse(localStorage.getItem('user'))
    }

    getToken(): string {
        return localStorage.getItem('token')
    }

    getAuthUserId(): number {
        return JSON.parse(localStorage.getItem('user')).id
    }
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

        this.notifyService.notify('Successfully logged in', 'success')

        this.router.navigate(['/dashboard'])
    }

    isloggedIn(): boolean {

        let token = localStorage.getItem('token')

        let user = localStorage.getItem('user')

        if (user && token) return true

        return false
    }

    logout() {

        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.router.navigate(['/auth/login'])
    }
}