// alterar posteriormente para um DTO que é o padrão do nest
// para que o tipo do dado que vem do front para o back e vice e versa seja o mesmo

export interface PersonInterface {
    personName: string;
    personPhone: string;
    personEmail: string;
    personAddress: string;
    personSex: string;
    personDocument: string;
    personFantasyName: string|null;
    personInscribe: string|null;
}