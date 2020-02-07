export class Book {
    // constructor(

        public BookID:number
        public BookName:string
        public BookDescription:string
        public Price:number
        public Author: string
        public IsActive:boolean

    // ) {
    // }
}


export class BookPurchase extends  Book {
    // constructor(
        public UserID:number
        public StatusID:number
        public Rating:number
        public Review:string
        public CreatedBy:number
        public CreatedDate:Date
        public ModifiedBy: number
        public ModifiedDate:Date       

    // ) {
    // }
}