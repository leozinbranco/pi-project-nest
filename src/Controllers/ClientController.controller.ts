import { Controller, Get, Post } from "@nestjs/common";
import { BaseController } from "./BaseController.controller";
import { ClientInterface } from "src/Interfaces/ClientInterface.interface";

@Controller()
export class ClientController extends BaseController {

    @Get('persons') 
    searchPersons() {
        return this.searchAll();
    }

    @Post('persons')
    createPerson(person: ClientInterface) {
        return this.create(person);
    }
}