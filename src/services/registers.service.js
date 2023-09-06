import Registers from "../models/Registers.js";

const createService = (body) => Registers.create(body);

const findAllService = (offset, limit) =>
  Registers.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countRegisters = () => Registers.countDocuments();

const topRegistersService = () =>
  Registers.findOne().sort({ _id: -1 }).populate("user");

const findByIdService = (id) => Registers.findById(id).populate("user");

const searchByTitleService = (title) =>
  Registers.find({ title: { $regex: `${title || ""}`, $options: "i" } })
    .sort({ _id: -1 })
    .populate("user");

const byUserService = (id) =>
  Registers.find({ user: id }).sort({ _id: -1 }).populate("user");

const updateService = (id, title, description, nature, valor) =>
  Registers.findOneAndUpdate(
    { _id: id },
    { title, description, nature, valor },
    {
      rawResult: true,
    }
  );

const eraseService = (id) => Registers.findByIdAndDelete({ _id: id });

const likeRegistersService = (idRegister, userID) =>
  Registers.findOneAndUpdate(
    { _id: idRegister, "likes.userID": { $nin: [userID] } },
    { $push: { likes: { userID, created: new Date() } } }
  );

const deleteLikeRegistersService = (idRegister, userID) =>
  Registers.findOneAndUpdate(
    { _id: idRegister },
    { $pull: { likes: { userID } } }
  );

const commentRegisterService = (idRegister, comment, userID) => {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);
  return Registers.findOneAndUpdate(
    { _id: idRegister },
    {
      $push: {
        comments: { idComment, userID, comment, createdAt: new Date() },
      },
    }
  );
};


const deleteCommentService = async (idRegister, idComment, userID) => {
  try {
    console.log("Antes do findOneAndUpdate");

    // Use await com findOneAndUpdate para obter o documento atualizado
    const updatedRecord = await Registers.findOneAndUpdate(
      { _id: idRegister },
      {
        $pull: {
          comments: { idComment, userID },
        },
      },
      { new: true } // Esta opção faz com que o método retorne o documento atualizado
    ).exec();

    console.log("Depois do findOneAndUpdate");

    if (!updatedRecord) {
      throw new Error("Registro não encontrado");
    }

    // O documento atualizado está em 'updatedRecord'
    console.log("Documento atualizado:", updatedRecord);

    // Resto do código, se necessário

    return updatedRecord; // Você pode retornar o documento atualizado se desejar
  } catch (error) {
    console.error("Erro em deleteCommentService:", error);
    throw error;
  }
};




/* const deleteCommentService = async (idRegister, idComment, userID) => {
  try {
 
    const existingComment = await Registers.findOne(
      { _id: idRegister, "comments.idComment": idComment },
      { "comments.$": 1 }
    ).exec();

    if (!existingComment) {
      throw new Error("Comentário não encontrado");
    }

    console.log("Depois da consulta para verificar existência do comentário");

    // Resto do código para excluir o comentário
  } catch (error) {
    console.error("Erro em deleteCommentService:", error);
    throw error;
  }
};

const deleteCommentService = (idRegister, idComment, userID) => {
  Registers.findOneAndUpdate(
    { _id: idRegister },
    {
      $pull: {
        comments: { idComment, userID },
      },
    }
  );
}; */

export {
  createService,
  findAllService,
  countRegisters,
  topRegistersService,
  findByIdService,
  searchByTitleService,
  byUserService,
  updateService,
  eraseService,
  likeRegistersService,
  deleteLikeRegistersService,
  commentRegisterService,
  deleteCommentService,
};
