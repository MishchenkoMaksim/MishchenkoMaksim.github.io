import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Author, AuthorService } from '../index';

@Component({
    selector: 'author-create-edit',
    templateUrl: './author-create-edit.component.html'
})

export class AuthorCreateEditComponent implements OnInit{

    currentAuthor: Author;
    authorForm: FormGroup;
    bool: boolean = true;

    constructor(private service: AuthorService,
                private activatedRoute: ActivatedRoute,
                private fb: FormBuilder,
                private router: Router
    ) { }

    ngOnInit() {
        this.buildForm()
        this.getAuthorFromRoute()

        if(this.currentAuthor == null){
            this.bool = false;
        }
    }

    checkError(el: string, errorType){
        return this.authorForm.get(el).touched && this.authorForm.get(el).hasError(errorType)
    }

    public onSubmit(authorForm: FormGroup) {
        this.currentAuthor.firstName = authorForm.value.firstName;
        this.currentAuthor.lastName = authorForm.value.lastName;
        this.currentAuthor.middleName = authorForm.value.middleName;
        this.currentAuthor.dateOfBirth = authorForm.value.dateOfBirth;

        if(this.currentAuthor.id){
            this.service.editAuthor(this.currentAuthor).subscribe(
                () => this.goBack()
            )
        } else {
            this.service.addAuthor(this.currentAuthor).subscribe(
                () => this.goBack()
            )
        }
    }

    public goBack() {
        this.router.navigate(['/authors']);
    }

    private getAuthorFromRoute() {
        this.activatedRoute.params.forEach((params)=> {
            let id = params['id'];

            if(id){
                this.service.getAuthor(id).subscribe(
                    author => {this.currentAuthor = author;
                    this.authorForm.patchValue(this.currentAuthor);
                }
                )
            } else {
                this.currentAuthor = new Author(null, null, null, null, null);
                this.authorForm.patchValue(this.currentAuthor);
            }
        });
    }

    private buildForm() {
        this.authorForm = this.fb.group({
            firstName: ["", [Validators.required, Validators.pattern("^[А-Яа-яЁё\s]+$")]],
            lastName: ["", [Validators.required, Validators.pattern("^[А-Яа-яЁё\s]+$")]],
            middleName: ["", [Validators.required, Validators.pattern("^[А-Яа-яЁё\s]+$")]],
            dateOfBirth: ["" , [Validators.required, Validators.pattern("[0-9]{2}\.[0-9]{2}\.[0-9]{4}")]]
        });
    }
}
