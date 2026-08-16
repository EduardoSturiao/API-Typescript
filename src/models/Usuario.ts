import mongoose, { type HydratedDocument } from "mongoose";
import bcrypt from "bcrypt"

export interface IUsuario {
  nome: string;
  email: string;
  senha: string;
}

const UsuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome é obrigatório"],
  },
  email: {
    type: String,
    required: [true, "Email é obrigatório"],
    unique: true
  },
  senha: {
    type: String,
    required: [true, "Senha é obrigatório"],
    select: false
  }, 
});


//HOOKS

UsuarioSchema.pre('save', async function(this: HydratedDocument<IUsuario>){
  if(!this.isModified('senha')) return
  this.senha = await bcrypt.hash(this.senha, 10)
})





export default mongoose.model<IUsuario>('Usuario', UsuarioSchema)



