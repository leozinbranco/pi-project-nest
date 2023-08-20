import { Controller, Get, Post } from "@nestjs/common";
import { BaseController } from "../../base.controller";
import { PersonInterface } from "../Interfaces/person.interface";

@Controller()
export class PersonController extends BaseController {

    @Get('persons') 
    searchPersons() {
        return this.searchAll();
    }

    @Post('persons')
    createPerson(person: PersonInterface) {
        return this.create(person);
    }
}