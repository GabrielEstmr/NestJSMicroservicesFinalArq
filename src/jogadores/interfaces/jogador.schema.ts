import * as mongoose from 'mongoose';


export const JogadorSchema = new mongoose.Schema({
    //id: nao precisa pois o próprio Mongo já cria
    telefoneCelular: { type: String },
    email: { type: String, unique: true },
    nome: String,
    ranking: String,
    posicaoRanking: Number,
    urlFotoJogador: String,
}, {
    timestamps: true,// para criar createdAt e updatedAt
    collection: 'jogadores'//Nome collection
})



