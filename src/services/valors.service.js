import Valors from "../models/Valor.js";

const createService = (body) => Valors.create(body);

const findAllService = (offset, limit) => Valors.find().sort({_id: -1}).skip(offset).limit(limit).populate("user");

export {
    createService,
    findAllService
};