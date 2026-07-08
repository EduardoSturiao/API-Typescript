import mongoose, { Query } from "mongoose";

interface ICliente {
  nome: string;
  email: string;
}

const ClienteSchema = new mongoose.Schema<ICliente>({
    nome: {
        type: String,
        required: [true, 'Nome é obrigatório']
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório']
    }
});


//HOOKS

ClienteSchema.pre('findOneAndDelete', async function(this: Query<any, ICliente>){
    const clienteId = this.getQuery()._id
    await mongoose.model('VendaMensal').deleteMany({cliente: clienteId})
})


export default mongoose.model<ICliente>('Cliente', ClienteSchema)