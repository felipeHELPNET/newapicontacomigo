import registerRepositories from "../repositories/register.repositories.js";

async function createRegisterService({ title, banner, text }, userId) {
  if (!title || !banner || !text)
    throw new Error("Submit all fields for registration");

  const { id } = await registerRepositories.createRegisterRepository(
    title,
    banner,
    text,
    userId
  );

  return {
    message: "Register created successfully!",
    register: { id, title, banner, text },
  };
}

async function findAllRegistersService(limit, offset, currentUrl) {
  limit = Number(limit);
  offset = Number(offset);

  if (!limit) {
    limit = 5;
  }

  if (!offset) {
    offset = 0;
  }

  const registers = await registerRepositories.findAllRegistersRepository(offset, limit);

  const total = await registerRepositories.countRegisters();

  const next = offset + limit;
  const nextUrl =
    next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

  const previous = offset - limit < 0 ? null : offset - limit;
  const previousUrl =
    previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

  registers.shift();

  return {
    nextUrl,
    previousUrl,
    limit,
    offset,
    total,

    results: registers.map((register) => ({
      id: register._id,
      title: register.title,
      text: register.text,
      likes: register.likes,
      comments: register.comments,
      name: register.user.name,
      username: register.user.username,
      avatar: register.user.avatar,
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
  const register = await registerService.findRegisterByIdService(id);

  if (!register) throw new Error("Register not found");

  if (register.user._id != userId) throw new Error("You didn't create this register");

  await registerRepositories.deleteRegisterRepository(id);
}

async function likeRegisterService(id, userId) {
  const registerLiked = await registerService.likesService(id, userId);

  if (registerLiked.lastErrorObject.n === 0) {
    await registerService.likesDeleteService(id, userId);
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
