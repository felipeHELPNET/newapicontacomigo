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
};
