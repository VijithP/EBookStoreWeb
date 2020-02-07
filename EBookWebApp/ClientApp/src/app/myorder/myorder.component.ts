import { Component, OnInit } from '@angular/core';
import { Book, BookPurchase } from '../shared/models/book';
import { BookfunctionalityService } from '../shared/services/bookfunctionality.service'

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit {

    
  bookDetailsPurchasedList: BookPurchase[] = [];
  bookPurchaseList:BookPurchase[]=[];
  bookPurchaseObj = new BookPurchase();
  loggedUserId: number = 1;
  sumOfItemInAddToCard: number = 0;
  totalPrice: number = 0;

  constructor(private _bookfunctionalityService: BookfunctionalityService) { }

  ngOnInit() {
    
    this.BindPurchasedBookDetails();
  }

  BindPurchasedBookDetails() {
    try {

      this.bookPurchaseObj.UserID = this.loggedUserId;
      this.bookPurchaseObj.StatusID = 2;

      
      this._bookfunctionalityService.GetBookPurchaseListDetails(this.bookPurchaseObj).subscribe(data => {

    
        if (data != null) {
          this.bookDetailsPurchasedList = data["Result"];       

        }

      });

    } catch (e) {
      console.warn('Error in BindPurchasedBookDetails' + e.toString());
    }
  }

}
