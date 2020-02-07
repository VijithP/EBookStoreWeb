import { Injectable } from '@angular/core';
// import { Http, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import { RequestOptions } from '@angular/http';
// import { Headers } from '@angular/http';
import { debug } from 'util';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServicesService {

  constructor(private _http: HttpClient) { }

 
  login(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this._http.post<any>(environment.baseUrl + 'token', data, { headers: reqHeader })
        .pipe(map(user => {   
          debugger;        
            if (user && user.access_token) {              
                localStorage.setItem('currentUser', JSON.stringify(user));
                localStorage.setItem('userToken', user.access_token);                

            }
            return user;
        }));
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
}


}

