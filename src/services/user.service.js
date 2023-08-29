import User from "../models/User.js";

const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findByIdUserService = (idUser) => User.findById(idUser);

const updateService = (id, name, email, password) =>
  User.findOneAndUpdate({ _id: id }, { id, name, email, password });

export default {
  createService,
  findAllService,
  findByIdUserService,
  updateService,
};
