import * as mongoose from 'mongoose';


export const CategoriaSchema = new mongoose.Schema({
    //id: nao precisa pois o próprio Mongo já cria
    categoria: { type: String, unique: true },
    descricao: { type: String },
    eventos: [
        {
            nome: { type: String },
            operacao: { type: String },
            valor: { type: String },
        }
    ],
    jogadores: [{
        type: mongoose.Schema.Types.ObjectId,//o que liga: ObjectId = Id que o mongose cria
        ref: "Jogador"//faz referencia ao Schema Jogador
    }]
}, {
    timestamps: true,// para criar createdAt e updatedAt
    collection: 'categorias'//Nome collection
})



