import Valors from "../models/Valor.js";

const createService = (body) => Valors.create(body);

const findAllService = (offset, limit) =>
  Valors.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countValors = () => Valors.countDocuments();

const topValorsService = () =>
  Valors.findOne().sort({ _id: -1 }).populate("user");

const findByIdService = (id) => Valors.findById(id).populate("user");

const searchByTitleService = (title) =>
  Valors.find({ title: { $regex: `${title || ""}`, $options: "i" } })
    .sort({ _id: -1 })
    .populate("user");

const byUserService = (id) =>
  Valors.find({ user: id }).sort({ _id: -1 }).populate("user");

const updateService = (id, title, description, nature, valor) =>
  Valors.findByIdAndUpdate(
    { _id: id },
    { title, description, nature, valor },
    { rawResult: true }
  );

export {
  createService,
  findAllService,
  countValors,
  topValorsService,
  findByIdService,
  searchByTitleService,
  byUserService,
  updateService,
};
