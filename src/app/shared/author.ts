export class Author{
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBirth: number;

    constructor(id, firstName, lastName, middleName, dateOfBirth){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleName = middleName;
        this.dateOfBirth = dateOfBirth;
    }
}