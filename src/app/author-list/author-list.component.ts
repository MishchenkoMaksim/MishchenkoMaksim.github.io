import { Component, OnInit } from '@angular/core';
import { AuthorService, Author, Book, BookService } from '../index';
import { Router } from "@angular/router";


@Component({
    selector: 'author-list',
    templateUrl: './author-list.component.html'
})
export class AuthorListComponent implements OnInit{

    authors: Author[];
    books: Book[];
    bool: boolean = true;

    constructor(private service: AuthorService,
                private router: Router,
                private bookService: BookService
    ){ }

    ngOnInit() {
        this.getAuthors()

        this.bookService.getBooks().subscribe(
            books => this.books = books
        )
    }

    private getAuthors() {
        this.service.getAuthors().subscribe(
            products => this.authors = products
        );
    }

    public deleteAuthor(author: Author) {
        this.router.navigate(["authors", "delete", author.id]);
    }

    public editAuthor(author: Author){
        this.router.navigate(["authors", "edit", author.id]);
    }

    public addAuthor(){
        this.router.navigate(['authors', 'create'])
    }

    public booksList(author){
        this.router.navigate(["authors",author.id, "bookslist"])
    }

    sortFName(){
        this.authors.sort(function(auth1: any, auth2: any) :any{
            if ( auth1.firstName < auth2.firstName ){
                return -1;
              }
              if ( auth1.firstName > auth2.firstName ){
                return 1;
              }
              return 0;
        })
    }

    sortLName(){
        this.authors.sort(function(auth1: any, auth2: any) :any{
            if ( auth1.lastName < auth2.lastName ){
                return -1;
              }
              if ( auth1.lastName > auth2.lastName ){
                return 1;
              }
              return 0;
        })
    }

    sortMName(){
        this.authors.sort(function(auth1: any, auth2: any) :any{
            if ( auth1.middleName < auth2.middleName ){
                return -1;
              }
              if ( auth1.middleName > auth2.middleName ){
                return 1;
              }
              return 0;
        })
    }

    sortBooks(){
        this.books.sort(function(book1: any, book2: any): any {
            if ( book1.bookName < book2.bookName ){
                return -1;
              }
              if ( book1.bookName > book2.bookName ){
                return 1;
              }
              return 0;
        })
    }

    boolTrue(){
        this.bool = true;
    }

    boolFalse() {
        this.bool = false;
    }

    searchBook(value){

        this.bookService.getBooks().subscribe(
            (result: any) => {
                this.books = result;
            }
        );

        for(let i = 0; i < this.books.length; i++){
            if(value != this.books[i].bookName){
                this.boolFalse();
            } else if(value == this.books[i].bookName){
            this.boolTrue();
            break;
            }
        }
    }

}