const User = require("../models/User");

const createService = (body) => User.create(body);

const findAllService = () => User.find();

const findByIdService = (id) => User.findById(id);

const updateService = (id, name, email, password) =>
  User.findOneAndUpdate({ _id: id }, { id, name, email, password });

module.exports = {
  createService,
  findAllService,
  findByIdService,
  updateService,
};
