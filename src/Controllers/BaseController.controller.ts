import { Controller } from "@nestjs/common";
import { ClientInterface } from "src/Interfaces/ClientInterface.interface";
import { BaseService } from "src/Services/BaseService.service";

@Controller()
export class BaseController {

    constructor (
        private readonly baseService: BaseService
    ) {}

    searchAll() {
        return this.baseService.searchAll();
    }

    create(person: ClientInterface) {
        return this.baseService.create(person);
    }
}