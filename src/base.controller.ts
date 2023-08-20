import { Controller } from "@nestjs/common";
import { PersonInterface } from "./Users/Interfaces/person.interface";
import { BaseService } from "src/base.service";

@Controller()
export class BaseController {

    constructor (
        private readonly baseService: BaseService
    ) {}

    searchAll() {
        return this.baseService.searchAll();
    }

    create(person: PersonInterface) {
        return this.baseService.create(person);
    }
}