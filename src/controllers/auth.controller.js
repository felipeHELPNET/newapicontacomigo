import bcrypt from "bcrypt";
import { loginService } from "../services/auth.service.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginService(email);
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(400).send({ message: "Senha Inválida" });
    }

    res.send({ user });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export { login };
