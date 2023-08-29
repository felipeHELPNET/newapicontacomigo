import { createService, findAllService, countValors } from "../services/valors.service.js";

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
  let { limit, offset } = req.query;

  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const valors = await findAllService(offset, limit);
  const total = await countValors();
  const currentUrl = req.baseUrl;

  const next = offset + limit;
  const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${offset}` : null; 

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  if (valors.length === 0) {
    return res.status(400).send({ message: "Sem operações cadastradas" });
  }
  res.send({
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: valors.map(item => ({
      id: item._id,
      title: item.title,
      description: item.description,
      valor: item.valor,
      nature: item.nature,
      userName: item.user.name,
    }))
  });
};

export { create, findAll };
