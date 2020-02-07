import { Component, OnInit } from '@angular/core';
import { Book, BookPurchase } from '../shared/models/book';
import { BookfunctionalityService } from '../shared/services/bookfunctionality.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addtocart',
  templateUrl: './addtocart.component.html',
  styleUrls: ['./addtocart.component.css']
})
export class AddtocartComponent implements OnInit {

  bookAddToCardList: BookPurchase[] = [];
  bookPurchaseList:BookPurchase[]=[];
  bookPurchaseObj = new BookPurchase();
  loggedUserId: number = 1;
  sumOfItemInAddToCard: number = 0;
  totalPrice: number = 0;

  constructor(private _bookfunctionalityService: BookfunctionalityService,private toastr: ToastrService) { }

  ngOnInit() {
    this.BindBookAddToCartDetails();
  }

  BindBookAddToCartDetails() {
    try {

      this.bookPurchaseObj.UserID = this.loggedUserId;
      this.bookPurchaseObj.StatusID = 1;
     
      this._bookfunctionalityService.GetBookPurchaseListDetails(this.bookPurchaseObj).subscribe(data => {

     
        if (data != null) {
          this.bookAddToCardList = data["Result"];
          this.GetSumOfAddToCartBook();

        }

      });

    } catch (e) {
      console.warn('Error in BindBookDetails' + e.toString());
    }
  }
  GetSumOfAddToCartBook() {
    this.bookAddToCardList.forEach((element: BookPurchase, index) => {
      this.totalPrice += element.Price;
    });

    this.sumOfItemInAddToCard = this.bookAddToCardList.length;

  }


  SaveBookPurchaseDetails() {
    try {
    

      this.bookAddToCardList.forEach((element: BookPurchase, index) => {
        this.bookPurchaseObj=new BookPurchase;
        this.bookPurchaseObj.UserID = this.loggedUserId;
        this.bookPurchaseObj.BookID = element.BookID;
        this.bookPurchaseObj.StatusID = 2;
        this.bookPurchaseObj.Rating = null;
        this.bookPurchaseObj.Review = null;  
        this.bookPurchaseList[index]=(this.bookPurchaseObj);
  
      });
      
      this._bookfunctionalityService.SaveBookPurchaseDetails(this.bookPurchaseList).subscribe(data => {
      
        if (data != null) {
       
          this.ShowSuccess('Successfully purchased','Purchase Book');
          this.BindBookAddToCartDetails();
        }
      });

    } catch (e) {
      console.warn('Error in SaveBookPurchaseDetails' + e.toString());
    }
  }

  ShowSuccess(bodytext:string,headertext:string) {
    this.toastr.success(bodytext, headertext);
  }



}
