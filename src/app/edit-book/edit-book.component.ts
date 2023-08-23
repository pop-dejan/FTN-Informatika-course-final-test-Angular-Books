import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../model/book.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BooksService } from '../service/books.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  myForm: FormGroup;
  constructor(private route: ActivatedRoute, private service: BooksService, private formBuilder: FormBuilder, private router: Router) { 

    this.myForm = this.formBuilder.group({
      ISBN: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      yearOfPublication: ['', Validators.required],
      publisher: ['', Validators.required],
     
    });
  }

  @Input() book: Book = new Book()
  bookId: number = 0;
  vidi: boolean = false;
  
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

  onSubmit(book:Book){
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
      })
    } else {
      console.log('Form je nevalidna');
    }
  }
}
