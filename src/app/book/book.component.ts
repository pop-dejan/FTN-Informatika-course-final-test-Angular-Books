import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../model/book.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
@Input () book: Book = new Book ();
@Input () vidi1:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
