import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/model/book.model';
import { Review } from 'src/app/model/review.model';
import { BooksService } from 'src/app/service/books.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: BooksService) { }
  
  @Input() book: Book = new Book();
  @Input() reviews: Review [] = [];
  bookId: number = 0;
  rating: number[] = [];
  vidi:boolean = false;
 
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.bookId = params['id'];
      this.getBook();
      this.getReviews();
    });
  }

  getBook(){
    this.service.getBook(this.bookId).subscribe({
      next: (response: Book) => {
        this.book = response;
      },
      error: (err: any) => {
        console.log('error: ', err);
      },
    });
  }

  getReviews(){
    this.service.getReviews(this.bookId).subscribe({
      next: (data: Review []) => {
        this.reviews = data;
        console.log(this.reviews);
        for(let i = 0; i < this.reviews.length; i++){
          this.rating.push(this.reviews[i].score);
        }
      },
      error: (err: any) => {
        console.log('error: ', err);
      },
    });
  }

  onDelete(review: Review){
    this.service.deleteReview(review).subscribe({
      next: (data: Review) => {
        this.getReviews();
      },
      error: (err: any) => console.log(err)
    })
  }

  calculateAverage(array: number[]) {
    let sum = 0;
    for (let i = 0; i < array.length; ++i) {
        sum += array[i];
    }
    return sum / array.length;
    };
}
