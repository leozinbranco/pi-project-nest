import { IsEmail, IsNotEmpty, Length, IsEnum, IsString } from "class-validator";
import { PersonActiveted } from "../Enums/person.enum";

export class PersonDto {
    @IsNotEmpty({ message: 'Obrigatório o envio do nome da pessoa!' })
    @IsString({ message: 'O nome deve ser uma string!' })
    @Length(8, 15, { message: 'O nome deve conter de 8 à 15 caracteres!' })
    personName: string;

    @IsNotEmpty({ message: 'Obrigatório o envio do telefone!'})
    @Length(11, 11 ,{ message: 'Telefone deve conter 11 caracteres!' })
    personPhone: string;

    @IsNotEmpty({ message: 'Obrigatório o envio do email!'})
    @IsEmail({}, { message: 'Formato de e-mail incorreto!' })
    personEmail: string;

    @IsNotEmpty({ message: 'Obrigatório o envio do endereço!'})
    personAddress: string;

    @IsEnum(PersonActiveted)
    personActive: PersonActiveted;
}