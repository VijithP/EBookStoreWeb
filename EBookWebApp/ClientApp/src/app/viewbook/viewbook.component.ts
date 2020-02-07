import { Component, OnInit } from '@angular/core';
import { Book, BookPurchase } from '../shared/models/book';
import { BookfunctionalityService } from '../shared/services/bookfunctionality.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewbook',
  templateUrl: './viewbook.component.html',
  styleUrls: ['./viewbook.component.css']
})
export class ViewbookComponent implements OnInit {

  bookList: Book[];
  bookListBind:Book[];
  bookRecentlyList: Book[];
  bookMostSellerList: Book[];
  bookPurchaseList: BookPurchase[]=[];

  bookObj:Book;
  bookPurchaseObj=new BookPurchase;

  loggedUserId: number = 1;
  searchText:string;

  constructor(private _bookfunctionalityService: BookfunctionalityService,private toastr: ToastrService,private router: Router) { }

  ngOnInit() {

    this.BindBookDetails();    


  }

  BindBookDetails() {
    try {

    
      this._bookfunctionalityService.GetBookListDetails().subscribe(data => {
      
        if (data != null) {

          this.bookList = data["Result"];
          this.bookListBind=this.bookList;
          this.BindHighlightedBookDetails();
        }

      });

    } catch (e) {
 
      console.warn('Error in BindBookDetails' + e.toString());
    }
  }

BindHighlightedBookDetails()
{
  try{

    this.bookMostSellerList=this.bookList.filter(e=>e.BookID <3);
    
    this.bookRecentlyList=this.bookList.filter(e=>e.BookID==8 || e.BookID==9 );

  } 
  catch(e)
  {
    console.warn('Error on BindHighlightedBookDetails'+e.toString());
  }

}





  SaveBookPurchaseDetails(bookID:number,type:number) {
    try {

    
      this.bookPurchaseObj.UserID=this.loggedUserId;
      this.bookPurchaseObj.BookID=bookID;
      this.bookPurchaseObj.StatusID=type;
      this.bookPurchaseObj.Rating=null;
      this.bookPurchaseObj.Review=null;

      this.bookPurchaseList[0]=(this.bookPurchaseObj);

      this._bookfunctionalityService.SaveBookPurchaseDetails(this.bookPurchaseList).subscribe(data => {

        if (data != null) {
          this.bookList = data["Result"];

          this.ShowSuccess('Successfully Added','Add to cart');


        }
      });

    } catch (e) {
      console.warn('Error in SaveBookPurchaseDetails' + e.toString());
    }
  }

PurchaseBookDetails(bookID:number,type:number)
{
  try 
  {

    this.SaveBookPurchaseDetails(bookID,type);
    this.router.navigateByUrl('/addtocart');

  }
  catch(e)
  {

  }
}



  SearchBookList()
  {
  

    if(this.searchText!="")
    {   
   
    this.bookListBind=this.bookList.filter(e=>e.BookName.toLowerCase().includes(this.searchText.toLowerCase()) 
    || e.BookDescription.toLowerCase().includes(this.searchText.toLowerCase())
    ||e.Author.toLowerCase().includes(this.searchText.toLowerCase()));
    }
    else{
      this.bookListBind=this.bookList;
    }
  }

  ShowSuccess(bodytext:string,headertext:string) {
    this.toastr.success(bodytext, headertext);
  }



}
