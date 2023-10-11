import registerService from "../services/register.service.js";

async function createRegisterController(req, res) {
  const { title, banner, text } = req.body;
  const userId = req.userId;

  try {
    const register = await registerService.createRegisterService(
      { title, banner, text },
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
    await registerService.updateRegisterService(id, title, banner, text, userId);

    return res.send({ message: "Register successfully updated!" });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function deleteRegisterController(req, res) {
  const { id } = req.params;
  const userId = req.userId;

  try {
    await registerService.deleteRegisterService(id, userId);
    return res.send({ message: "Register deleted successfully" });
  } catch (err) {
    return res.status(500).send(e.message);
  }
}

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
      message: "Comment successfully completed!",
    });
  } catch (e) {
    return res.status(500).send(e.message);
  }
}

async function commentDeleteRegisterController(req, res) {
  const { id: RegisterId, idComment } = req.params;
  const userId = req.userId;

  try {
    await registerService.commentDeleteRegisterService(registerId, userId, idComment);

    return res.send({ message: "Comment successfully removed" });
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
