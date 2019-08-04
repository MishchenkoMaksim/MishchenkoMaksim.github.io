export class Book{
    id: string;
    bookName: string;
    numOfPages: number;
    genre: string;
    id2: string;
    href: string;

    constructor(id, bookName, numOfPages, genre, id2, href){
        this.id = id;
        this.bookName = bookName;
        this.numOfPages = numOfPages;
        this.genre = genre;
        this.id2 = id2;
        this.href = href;
    }
}