import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { AuthorService, Author } from '../index';

@Component({
    selector: 'author-delete',
    templateUrl: './author-delete.component.html'
})

export class AuthorDeleteComponent implements OnInit{

    currentAuthor: Author;

    constructor(private activatedRoute: ActivatedRoute,
        private router: Router,
        private service: AuthorService) { }


    ngOnInit() {
        let id = this.activatedRoute.snapshot.params['id'];
        if(id){
            this.service.getAuthor(id).subscribe(
                author => this.currentAuthor = author
            )
        }
    }

    deleteAuthor() {
        this.service.deleteAuthor(this.currentAuthor).subscribe(
            () => this.goBack()
        )
    }

    goBack() {
        this.router.navigate(["/authors"])
    }
}