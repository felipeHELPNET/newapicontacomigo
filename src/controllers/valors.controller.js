import { createService, findAllService } from "../services/valors.service.js";

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
  const valors = await findAllService();
  if (valors.length === 0) {
    return res.status(400).send({ message: "Sem operações cadastradas" });
  }
  res.send(valors);
};

export { create, findAll };
