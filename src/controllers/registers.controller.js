import {
  createService,
  findAllService,
  countRegisters,
  topRegistersService,
  findByIdService,
  searchByTitleService,
  byUserService,
  updateService,
  eraseService,
} from "../services/registers.service.js";

const create = async (req, res) => {
  try {
    const { title, description, nature, valor } = req.body;

    if (!title || !description || !nature || !valor) {
      res
        .status(400)
        .send({ message: "Falta algum dado para o completo registro!" });
    }

    await createService({
      title,
      description,
      nature,
      valor,
      user: req.user,
    });

    res.send(201);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findAll = async (req, res) => {
  try {
    let { limit, offset } = req.query;

    limit = Number(limit);
    offset = Number(offset);

    if (!limit) {
      limit = 5;
    }

    if (!offset) {
      offset = 0;
    }

    const registers = await findAllService(offset, limit);
    const total = await countRegisters();
    const currentUrl = req.baseUrl;

    const next = offset + limit;
    const nextUrl =
      next < total ? `${currentUrl}?limit=${limit}&offset=${offset}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl =
      previous != null
        ? `${currentUrl}?limit=${limit}&offset=${previous}`
        : null;

    if (registers.length === 0) {
      return res.status(400).send({ message: "Sem registros cadastrados" });
    }
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,

      results: registers.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        valor: item.valor,
        nature: item.nature,
        userName: item.user.name,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const topRegisters = async (req, res) => {
  try {
    const register = await topRegistersService();

    if (!register) {
      return res.status(400).send({ message: "Sem NEWS registrada!" });
    }

    res.send({
      register: {
        id: register._id,
        title: register.title,
        description: register.description,
        valor: register.valor,
        nature: register.nature,
        userName: register.user.name,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findById = async (req, res) => {
  try {
    const { id } = req.params;

    const registers = await findByIdService(id);

    return res.send({
      registers: {
        id: registers._id,
        title: registers.title,
        description: registers.description,
        valor: registers.valor,
        nature: registers.nature,
        userName: registers.user.name,
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const searchByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const registers = await searchByTitleService(title);

    if (!registers.length === 0) {
      return res
        .status(400)
        .send({ message: "Não existe Registro com este título" });
    }

    return res.send({
      results: registers.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        valor: item.valor,
        nature: item.nature,
        userName: item.user.name,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const byUser = async (req, res) => {
  try {
    const id = req.userId;
    const register = await byUserService(id);

    return res.send({
      results: register.map((item) => ({
        id: item._id,
        title: item.title,
        description: item.description,
        valor: item.valor,
        nature: item.nature,
        userName: item.user.name,
      })),
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const update = async (req, res) => {
  try {
    const { title, description, nature, valor } = req.body;
    const { id } = req.params;

    if (!title && !description && !nature && !valor) {
      res
        .status(400)
        .send({ message: "Indique algum dado do registro á ser atualizado!" });
    }

    const register = await findByIdService(id);

    if (String(register.user._id) !== req.userID) {
      return res.status(400).send({
        message: "Somente o usuário que cadastrou o registro pode edita-la",
      });
    }

    await updateService(id, title, description, nature, valor);

    return res.send({ message: "Registro atualizado com sucesso" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const erase = async (req, res) => {
  try {
    const { id } = req.params;

    const registers = await findByIdService(id);

    if (String(registers.user._id) !== req.userID) {
      return res
        .status(400)
        .send({ message: "Você não pode alterar este registro!" });
    }

    await eraseService(id);

    return res.send({message: "Registro deletado com sucesso!"})

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export {
  create,
  findAll,
  topRegisters,
  findById,
  searchByTitle,
  byUser,
  update,
  erase,
};
