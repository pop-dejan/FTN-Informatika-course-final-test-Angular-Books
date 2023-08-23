import { Component, OnInit } from '@angular/core';
import { BooksService } from '../service/books.service';
import { BookSearchResult } from '../model/book.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private service: BooksService) { }
  books: BookSearchResult = new BookSearchResult();
  params = {
    page: 1,
    pageSize: 10,
    filter: {
      title: '',
      author: ''
    },
  }
  radioValue: any = ""
  form = new FormGroup({
    search: new FormControl('', Validators.required),
  });
 

  ngOnInit(): void {
    this.getBooks();
   
  }

  getBooks() {
    this.service.getBooks(this.params).subscribe({
      next: (data: BookSearchResult) => {
        this.books = data;
        console.log(this.books);
      },
      error: (err) => console.log(err)
    })
  }

  onPageChanged(newPage: number): void {
    this.params.page = newPage;
    this.getBooks();
  }

  onPageSizeChanged(newPageSize: number): void {
    this.params.pageSize = newPageSize;
    this.params.page = 1;
    this.getBooks();
  }

  checkStatus(event:any){
    if(event.target.checked == true){
      this.radioValue = event.target.value;
    }
  }
  
onSearch(){
  this.params.filter.author = "";
  this.params.filter.title = "";
  if(this.radioValue == "title"){
    this.params.filter.title =  this.form.value.search || "";
  } else if(this.radioValue = "author"){
    this.params.filter.author =  this.form.value.search || "";;
  }
  this.getBooks();
}
  



  

}
