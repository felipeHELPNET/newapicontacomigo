import registerRepositories from "../repositories/register.repositories.js";

async function createRegisterService({ title, description, nature, valor }, userId) {
  if (!title || !description || !nature || !valor) throw new Error("Submit all fields for registration");

  const { id } = await registerRepositories.createRegisterRepository(
    title, 
    description, 
    nature, 
    valor,
    userId
  );

  return {
    message: "Register created successfully!",
    register: { id, title, description, nature, valor },
  };
}

  async function findAllRegistersService() {
  const registers = await registerRepositories.findAllRegistersRepository();
  const total = await registerRepositories.countRegisters();

  return { 
    total,
    results: registers.map((register) => ({
      id: register._id,
      title: register.title,
      description: register.description, 
      nature: register.nature, 
      valor: register.valor,
      likes: register.likes,
      comments: register.comments,
      // name: register.user.name,
      // username: register.user.username,
      // avatar: register.user.avatar,
    })),
  };
}

async function topNewsService() {
  const register = await registerRepositories.topNewsRepository();

  if (!register) throw new Error("There is no registered register");

  return {
    register: {
      id: register._id,
      title: register.title,
      text: register.text,
      likes: register.likes,
      comments: register.comments,
      name: register.user.name,
      username: register.user.username,      
    },
  };
}

async function searchRegisterService(title) {
  const foundRegisters = await registerRepositories.searchRegisterRepository(title);

  if (foundRegisters.length === 0)
    throw new Error("There are no registers with this title");

  return {
    foundRegisters: foundRegisters.map((register) => ({
      id: register._id,
      title: register.title,
      banner: register.banner,
      text: register.text,
      likes: register.likes,
      comments: register.comments,
      name: register.user.name,
      username: register.user.username,
      avatar: register.user.avatar,
    })),
  };
}

async function findRegisterByIdService(id) {
  const register = await registerRepositories.findregisterByIdRepository(id);

  if (!register) throw new Error("Register not found");

  return {
    id: register._id,
    title: register.title,
    banner: register.banner,
    text: register.text,
    likes: register.likes,
    comments: register.comments,
    name: register.user.name,
    username: register.user.username,
    avatar: register.user.avatar,
  };
}

async function findRegistersByUserIdService(id) {
  const registers = await registerRepositories.findRegistersByUserIdRepository(id);

  return {
    registersByUser: registers.map((register) => ({
      id: register._id,
      title: register.title,
      banner: register.banner,
      text: register.text,
      likes: register.likes,
      comments: register.comments,
      name: register.user.name,
      username: register.user.username,
      avatar: register.user.avatar,
    })),
  };
}

async function updateRegisterService(id, title, banner, text, userId) {
  if (!title && !banner && !text)
    throw new Error("Submit at least one field to update the register");

  const register = await registerRepositories.findRegisterByIdRepository(id);

  if (!register) throw new Error("Register not found");

  if (register.user._id != userId) throw new Error("You didn't create this register");

  await registerRepositories.updateRegisterRepository(id, title, banner, text);
}

async function deleteRegisterService(id, userId) {
  const register = await registerRepositories.deleteRegisterRepository(id);

  if (!register) {
    throw new Error("Registro não encontrado");
  }

//  if (register.user._id !== userId) {
//    throw new Error("Você não criou este registro");
//  }

  return register;
}

async function likeRegisterService(id, userId) {
  const registerLiked = await registerService.likesService(id, userId);

  if (registerLiked.lastErrorObject.n === 0) {
    await registerRepositories.likesDeleteRepository(id, userId);
    return { message: "Like successfully removed" };
  }

  return { message: "Like done successfully" };
}

async function commentRegisterService(registerId, message, userId) {
  if (!message) throw new Error("Write a message to comment");

  const register = await registerRepositories.findRegisterByIdRepository(registerId);

  if (!register) throw new Error("Register not found");

  await registerRepositories.commentsRepository(registerId, message, userId);
}

async function commentDeleteRegisterService(registerId, userId, idComment) {
  const register = await registerRepositories.findRegisterByIdRepository(registerId);

  if (!register) throw new Error("Register not found");

  await registerRepositories.commentsDeleteRepository(registerId, userId, idComment);
}

export default {
  createRegisterService,
  findAllRegistersService,
  topNewsService,
  searchRegisterService,
  findRegisterByIdService,
  findRegistersByUserIdService,
  updateRegisterService,
  deleteRegisterService,
  likeRegisterService,
  commentRegisterService,
  commentDeleteRegisterService,
};
