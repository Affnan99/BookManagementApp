import { Component, OnInit } from '@angular/core';
import { BookService } from './book.service';
import { Book } from './book';
import { NgForm } from '@angular/forms';

@Component({
selector: 'app-root',
templateUrl: './app.component.html',
styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
books: Book[] = [];
newBook: Book = {
id: 0,
title: '',
author: '',
isbn: '',
publicationDate: ''
};
editMode = false;
editId: number | null = null;

constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (error) => {
        console.error('Error loading books:', error);
      }
    });
  }

  addBook(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    if (this.editMode && this.editId !== null) {
      this.bookService.updateBook(this.editId, this.newBook).subscribe({
        next: () => {
          this.resetForm();
          this.loadBooks();
        },
        error: (error) => {
          console.error('Error updating book:', error);
        }
      });
    } else {
      this.bookService.addBook(this.newBook).subscribe({
        next: () => {
          this.resetForm();
          this.loadBooks();
          form.resetForm();
        },
        error: (error) => {
          console.error('Error adding book:', error);
        }
      });
    }
  }

  editBook(book: Book): void {
    this.newBook = { ...book };
    this.editId = book.id;
    this.editMode = true;
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.loadBooks();
        },
        error: (error) => {
          console.error('Error deleting book:', error);
        }
      });
    }
  }

  resetForm(): void {
    this.newBook = { id: 0, title: '', author: '', isbn: '', publicationDate: '' };
    this.editId = null;
    this.editMode = false;
  }
}