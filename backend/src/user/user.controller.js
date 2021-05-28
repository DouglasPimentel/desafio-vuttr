import User from './user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET = process.env.SECRET;

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ success: false, message: 'fields cannot be empty' });
    }

    const user = await User.findOne({ email });

    const pass = bcrypt.compareSync(password, user.password);

    if (pass) {
      const token = jwt.sign({ data: user }, SECRET, { expiresIn: 60 * 60 });

      return res
        .status(200)
        .send({ success: true, message: 'login successfully', user, token });
    }

    res.status(400).send({ success: false, message: 'password invalid' });
  } catch (err) {
    res
      .status(500)
      .send({ succes: false, message: 'error signing in', error: err.message });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  user.password = undefined;

  res.status(200).send({ success: true, user });
};

export const create = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = new User({ firstName, lastName, email, password });

  await user.save();

  user.password = undefined;

  res.status(201).send({ success: true, user });
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res
      .status(204)
      .send({ success: true, message: 'user successfully deleted' });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'error when deleting user',
      error: err.message,
    });
  }
};
