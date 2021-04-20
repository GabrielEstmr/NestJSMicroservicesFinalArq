import { Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categoria.interface';

@Controller('/api/v1/categorias')
export class CategoriasController {

    constructor(private readonly categoriasService: CategoriasService) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(

        @Body()
        criarCategoriaDto: CriarCategoriaDto

    ): Promise<Categoria> {
        return await this.categoriasService.criarCategoria(criarCategoriaDto);
    }

    @Put('/:categoria')
    @UsePipes(ValidationPipe)// ==> é para aquil que usa pipe
    async atualizarCategoria(

        @Param('categoria')
        categoria: string,

        @Body()
        atualizarCategoriaDto: AtualizarCategoriaDto

    ): Promise<void> {
        return await this.categoriasService.atualizarCategoria(categoria, atualizarCategoriaDto);
    }


    @Get()
    async consultarCategorias(): Promise<Array<Categoria>> {
        return await this.categoriasService.consultarTodasCategorias();
    }


    @Get('/:categoria')
    async consultarCategoriasPeloId(

        @Param('categoria')
        categoria: string,

    ): Promise<Categoria> {
        return await this.categoriasService.consultarCategoriasPeloId(categoria);
    }


    @Post('/:categoria/jogadores/:idJogador')
    async atribuirCategoriaJogador(

        @Param()
        params: string[]

    ): Promise<void> {
        // console.log('PARAMETROS', params)
        return await this.categoriasService.atribuirCategoriaJogador(params)
    }

}
