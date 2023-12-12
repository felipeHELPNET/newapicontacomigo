import registerService from "../services/register.service.js";

async function createRegisterController(req, res) {
  const { title, description, nature, valor } = req.body;
  const userId = req.userId;

  try {
    const register = await registerService.createRegisterService(
      { title, description, nature, valor },
      userId
    );
    return res.status(201).send(register);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findAllRegistersController(req, res) {
  const { limit, offset } = req.query;
  const currentUrl = req.baseUrl;

  try {
    const registers = await registerService.findAllRegistersService(
      limit,
      offset,
      currentUrl
    );
    return res.send(registers);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function topNewsController(req, res) {
  try {
    const register = await registerService.topNewsService();
    return res.send(register);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function searchRegisterController(req, res) {
  const { title } = req.query;

  try {
    const foundRegisters = await registerService.searchRegisterService(title);

    return res.send(foundRegisters);
  } catch (e) {
    res.status(500).send(e.message);
  }
}

async function findRegisterByIdController(req, res) {
  const { id } = req.params;

  try {
    const register = await registerService.findRegisterByIdService(id);
    return res.send(register);
  } catch (e) {
    res.status(404).send(e.message);
  }
}

async function findRegistersByUserIdController(req, res) {
  const id = req.userId;
  try {
    const registers = await registerService.findRegistersByUserIdService(id);
    return res.send(registers);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function updateRegisterController(req, res) {
  const { title, banner, text } = req.body;
  const { id } = req.params;
  const userId = req.userId;

  try {
    await registerService.updateRegisterService(id, title, description, nature, valor, userId);

    return res.send({ message: "Registro atualizado com sucesso!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function deleteRegisterController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await registerService.deleteRegisterService(id, userId);
    return res.status(200).send({ message: "Registro deletado com sucesso" });
  } catch (err) {
    if (err.message === "Registro não encontrado") {
      return res.status(404).send({ error: "Registro não encontrado" });
    }

    if (err.message === "Você não criou este registro") {
      return res.status(403).send({ error: "Você não tem permissão para excluir este registro" });
    }

    return res.status(500).send({ error: "Erro interno do servidor" });
  }
}


/* async function deleteRegisterController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await registerService.deleteRegisterService(id, userId);
    return res.send({ message: "Registro deletado com sucesso" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
} */

async function likeRegisterController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    const response = await registerService.likeRegisterService(id, userId);

    return res.send(response);
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentRegisterController(req, res) {
  const { id: registerId } = req.params;
  const { message } = req.body;
  const userId = req.userId;

  try {
    await registerService.commentRegisterService(registerId, message, userId);

    return res.send({
      message: "Comentário registrado com sucesso!",
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentDeleteRegisterController(req, res) {
  const { id: registerId, idComment } = req.params;
  const userId = req.userId;

  try {
    await registerService.commentDeleteRegisterService(registerId, userId, idComment);

    return res.send({ message: "Comentário removido com sucesso!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

export default {
  createRegisterController,
  findAllRegistersController,
  topNewsController,
  searchRegisterController,
  findRegisterByIdController,
  findRegistersByUserIdController,
  updateRegisterController,
  deleteRegisterController,
  likeRegisterController,
  commentRegisterController,
  commentDeleteRegisterController,
};
