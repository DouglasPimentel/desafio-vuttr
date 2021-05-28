import User from './user.model';

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
