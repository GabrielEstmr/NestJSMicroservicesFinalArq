import { Controller, Post, Get, Body, Delete, UsePipes, ValidationPipe, Query, Param, Put } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { AtualizarJogadorDto } from './dtos/atualizar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { ValidacaoParametrosPipe } from '../common/pipes/validacao-parametros.pipe'

@Controller('/api/v1/jogadores')
export class JogadoresController {

    //Injeção de dependencia via CONSTRUCTOR
    constructor(private jogadoresService: JogadoresService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto
    ): Promise<Jogador> {
        return await this.jogadoresService.criarJogador(criarJogadorDto);
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body()
        atualizarJogadorDto: AtualizarJogadorDto,

        @Param('_id', ValidacaoParametrosPipe)
        _id: string
    ) {
        await this.jogadoresService.atualizarJogador(_id, atualizarJogadorDto);
    }


    @Get()
    async consultarJogadores(): Promise<Jogador[]> {
        return await this.jogadoresService.consultarTodosJogadores();
    }

    @Get('/:_id')
    async consultarJogadorPeloId(
        @Param('_id', ValidacaoParametrosPipe)
        _id: string
    ): Promise<Jogador> {
        return await this.jogadoresService.consultarJogadorPeloId(_id);
    }

    @Delete('/:_id')
    async deletarJogador(
        // @Param('email', JogadoresValidacaoParametrosPipe)
        @Param('_id')
        _id: string
    ): Promise<void> {
        return await this.jogadoresService.deletarJogador(_id);
    }

}
