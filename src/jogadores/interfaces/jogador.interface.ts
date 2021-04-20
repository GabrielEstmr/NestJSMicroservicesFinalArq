import { Document } from 'mongoose';

export interface Jogador extends Document {
    // readonly _id: string; => nao precisa pois o Mongo cria
    readonly telefoneCelular: string;
    readonly email: string;
    nome: string;
    ranking: string;
    posicaoRanking: number;
    urlFotoJogador: string;
}