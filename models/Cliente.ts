import mongoose from "mongoose";

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


export default mongoose.model<ICliente>('Cliente', ClienteSchema)