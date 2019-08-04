import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {Location} from '@angular/common';

import { BookService, Book } from '../../index';

@Component({
    selector: 'book-delete',
    templateUrl: './book-delete.component.html'
})
export class BookDeleteComponent implements OnInit{ 

    currentBook: Book;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private service: BookService,
        private location: Location
    ) { }


    ngOnInit() {
        let id = this.activatedRoute.snapshot.params['id'];
        if(id){
            this.service.getBook(id).subscribe(
                book => this.currentBook = book
            )
        }
    }

    deleteBook(){
        this.service.deleteBook(this.currentBook).subscribe(
            () => this.goBack()
        )
    }

    goBack() {
        this.location.back();
    }
}