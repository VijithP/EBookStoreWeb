import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Book, BookPurchase } from '../models/book';


@Injectable({
  providedIn: 'root'
})
export class BookfunctionalityService {

  private rootURL;

  constructor(private _http: HttpClient) {
      this.rootURL = environment.baseUrl + 'api/BookOperation/';
  }  

  GetBookListDetails() {
    debugger;  
   var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'false' });

       return (this._http.get<Book[]>(this.rootURL + 'GetBookDetails' ,{ headers: reqHeader }));

       debugger;
   }  

   SaveBookPurchaseDetails(formData: BookPurchase[]) {
    debugger;      
    return (this._http.post(this.rootURL + 'BookBuying',formData));

   }  

   GetBookPurchaseListDetails(formData: BookPurchase) {
    debugger;      
    return (this._http.post<Book[]>(this.rootURL + 'GetMyOrders',formData));

   }  




}
