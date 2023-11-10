import Register from "../models/Register.js";

function createRegisterRepository(title, description, nature, valor, userId) {
  return Register.create({ title, description, nature, valor, user: userId });
}

function findAllRegistersRepository(offset, limit) {
  return Register.find()
    .sort({ _id: -1 })
    .skip(offset)
    .limit(limit)
    .populate("user");
}

function topNewsRepository() {
  return Register.findOne().sort({ _id: -1 }).populate("user");
}

function findRegisterByIdRepository(id) {
  return Register.findById(id).populate("user");
}

function countRegisters() {
  return Register.countDocuments();
}

function searchRegisterRepository(title) {
  return Register.find({
    title: { $regex: `${title || ""}`, $options: "i" },
  })
    .sort({ _id: -1 })
    .populate("user");
}

function findRegistersByUserIdRepository(id) {
  return Register.find({
    user: id,
  })
    .sort({ _id: -1 })
    .populate("user");
}

function updateRegisterRepository(id, title, banner, text) {
  return Register.findOneAndUpdate(
    {
      _id: id,
    },
    {
      title, 
      description, 
      nature, 
      valor,
    },
    {
      rawResult: true,
    }
  );
}

function deleteRegisterRepository(id) {
  return Register.findOneAndDelete({ _id: id });
}

function likesRepository(id, userId) {
  return Register.findOneAndUpdate(
    {
      _id: id,
      "likes.userId": { $nin: [userId] },
    },
    {
      $push: {
        likes: { userId, created: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
}

function likesDeleteRepository(id, userId) {
  return Register.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        likes: {
          userId: userId,
        },
      },
    }
  );
}

function commentsRepository(id, message, userId) {
  let idComment = Math.floor(Date.now() * Math.random()).toString(36);
  return Register.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $push: {
        comments: { idComment, userId, message, createdAt: new Date() },
      },
    },
    {
      rawResult: true,
    }
  );
}

function commentsDeleteRepository(id, userId, idComment) {
  return Register.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $pull: {
        comments: {
          idComment: idComment,
          userId: userId,
        },
      },
    }
  );
}

export default {
  createRegisterRepository,
  findAllRegistersRepository,
  topNewsRepository,
  findRegisterByIdRepository,
  searchRegisterRepository,
  findRegistersByUserIdRepository,
  updateRegisterRepository,
  deleteRegisterRepository,
  likesRepository,
  likesDeleteRepository,
  commentsRepository,
  commentsDeleteRepository,
  countRegisters,
};
