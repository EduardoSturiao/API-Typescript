import mongoose, { type HydratedDocument } from "mongoose";

interface IVendaMensal {
  mes: number;
  valorVendido: number;
}

const VendaMensalSchema = new mongoose.Schema({
  mes: {
    type: Number,
    required: [true, "Mês é obrigatório"],
    min: [1, "Mês inválido"],
    max: [12, "Mês inváalido"],
  },
  valorVendido: {
    type: Number,
    required: [true, "Valor é obrigatório"],
    min: [0, "O valor não pode ser negativo"],
  },
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: [true, 'Cliente obrigatório']
  }
});

//HOOKS
VendaMensalSchema.post("save", function (doc: HydratedDocument<IVendaMensal>) {
  console.log("Venda salva com sucesso. ID:", doc._id);
});

export default mongoose.model<IVendaMensal>("VendaMensal", VendaMensalSchema);
