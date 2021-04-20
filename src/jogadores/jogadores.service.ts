import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { v1 as uuid } from 'uuid';


import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';


@Injectable()
export class JogadoresService {

    // //Aqui: é interface pois tem todos os Dados
    // private jogadores: Jogador[] = [];

    private readonly logger = new Logger(JogadoresService.name);

    constructor(
        @InjectModel('Jogador')//decorador para injetar dependencia
        private readonly jogadorModel: Model<Jogador>//Model do mongoose do tipo Jogador
    ) { }

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {

        const { email } = criarJogadorDto;
        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

        if (jogadorEncontrado) {
            throw new BadRequestException(`Jogador com email: ${email} já cadastrado`);
        }

        const jogadorCriado = new this.jogadorModel(criarJogadorDto)//criado objeto no bando
        return await jogadorCriado.save()
    }

    async atualizarJogador(_id: String, atualizarJogadorDto: AtualizarJogadorDto): Promise<void> {

        const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }

        await this.jogadorModel.findOneAndUpdate({ _id }, { $set: atualizarJogadorDto }).exec();
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async consultarJogadorPeloId(_id: string): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();

        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }

        return jogadorEncontrado;
    }

    async deletarJogador(_id: string): Promise<void> {

        //=======Criar Método Privado para essa exceção======pois se repete
        const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
        if (!jogadorEncontrado) {
            throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
        }
        //======================================================================

        await this.jogadorModel.deleteOne({ _id }).exec();
    }



    // private async atualizar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {

    //     return await this.jogadorModel.findOneAndUpdate({ email: criarJogadorDto.email }, { $set: criarJogadorDto }).exec();

    // }

    // //DTO to Interface
    // private async criar(criarJogadorDto: CriarJogadorDto): Promise<Jogador> {

    //     const jogadorCriado = new this.jogadorModel(criarJogadorDto)//criado objeto no bando
    //     return await jogadorCriado.save()

    // }

}
