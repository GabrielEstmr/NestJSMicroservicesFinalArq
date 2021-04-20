import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class ValidacaoParametrosPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        // console.log(`value: ${value} | Metadata: ${metadata.type}`)
        if (!value) {
            throw new BadRequestException(`O valor do parametro ${metadata.data} deve ser informado`)
            //aqui: já mapa a classe: já da retorno
        }
        return value
    }
}