import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from 'src/app/model/book.model';
import { BooksService } from 'src/app/service/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  myForm: FormGroup;
  @Input ()vidi: boolean = true;
  @Input() book: Book = new Book();
  bookId: number = 0;

  constructor(private formBuilder: FormBuilder, private service: BooksService,  private router: Router, private route: ActivatedRoute,) {
    this.myForm = this.formBuilder.group({
      ISBN: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      yearOfPublication: ['', Validators.required],
      publisher: ['', Validators.required],
    });
   }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.bookId = params['id'];
      this.getBook();
    });
  }

  getBook(){
    this.service.getBook(this.bookId).subscribe({
      next: (response: Book) => {
        this.book = response;
        this.myForm.patchValue(this.book);
      },
      error: (err: any) => {
        console.log('error: ', err);
      },
    });
  }

  onSubmit(){
    if (this.myForm.valid) {
      let newBook: Book = new Book(this.myForm.value);
     
      console.log(newBook)
      this.service.postBook(newBook).subscribe({
        next: (response:any) => {
          this.router.navigate(['/books', response._id]);
        },
        error: (response: any) => {
          alert("Nemate registrovan nalog!")
        }
      })
    } else {
      console.log('Form je nevalidna');
    }
  }

  onSubmitput(){
    if (this.myForm.valid) {
      let newBook:Book = new Book(this.myForm.value);
      newBook._id = this.bookId;

      this.service.izmeniKnjigu(newBook).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['/books', data._id]);
        },
        error: () => {
          console.log('Greska');
        },
      });
    } else {
      console.log('Form je nevalidna');
    }
  }
}
