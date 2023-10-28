import { PersonActiveted } from "../Enums/person.enum";

export class PersonDto {
    personName: string;
    personPhone: string;
    personEmail: string;
    personAddress: string;
    personActive: PersonActiveted;
}