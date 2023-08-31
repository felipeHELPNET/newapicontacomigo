import Valors from "../models/Valor.js";

const createService = (body) => Valors.create(body);

const findAllService = (offset, limit) =>
  Valors.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user");

const countValors = () => Valors.countDocuments();

const topValorsService = () =>
  Valors.findOne().sort({ _id: -1 }).populate("user");

const findByIdService = (id) => Valors.findById(id).populate("user");

export { createService, findAllService, countValors, topValorsService, findByIdService };
