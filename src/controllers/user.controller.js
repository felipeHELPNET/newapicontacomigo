const userService = require("../services/user.service");
const mongoose = require("mongoose");

const create = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).send({ message: "Dados incompletos para o registro!" });
  }

  const user = await userService.createService(req.body);

  if (!user) {
    return res.status(400).send({ message: "Erro na criação do usuário" });
  }

  res.status(201).send({
    message: "Usuário criado com sucesso",
    user: {
      id: user._id,
      name,
      email,
    },
  });
};

const findAll = async (req, res) => {
  const users = await userService.findAllService();

  if (users.length === 0) {
    return res.status(400).send({ message: "Sem usuários cadastrados" });
  }

  res.send(users);
};

const findById = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "ID inválido!" });
  }

  const user = await userService.findByIdService(id);

  if (!user) {
    return res.status(400).send({ message: "Usuário não existe!" });
  }

  res.send(user);
};

const update = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name && !email && !password) {
    res.status(400).send({ message: "Submeta algum dado válido para o UPDATE" });
  }

  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ message: "ID inválido!" });
  }

  const user = await userService.findByIdService(id);
  if (!user) {
    return res.status(400).send({ message: "Usuário não encontrado!" });
  }

  await userService.updateService(
    id,
    name,
    email,
    password
  );

  res.send({message: "Usuário atualizado com sucesso!"})
};

module.exports = { create, findAll, findById, update };
