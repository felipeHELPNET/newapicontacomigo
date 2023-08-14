const userService = require('../services/user.service')
const create = async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).send({message: "Dados incompletos para o registro!"})
    }

    const user = await userService.create(req.body);

    if (!user){
        return res.status(400).send({message: "Erro na criação do usuário"})
    }

    res.status(201).send({
        message: "Usuário criado com sucesso",
        user: {
            id: user._id,
            name,
            email,
        },
       


    })
};

module.exports = { create };