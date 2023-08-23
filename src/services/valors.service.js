import Valors from "../models/Valor.js";

const createService = (body) => Valors.create(body);

const findAllService = () => Valors.find();

export {
    createService,
    findAllService
};