import Tool from './tool.model';

export const getAll = async (req, res) => {
  const tools = await Tool.find();

  res.status(200).send({ success: true, tools });
};

export const getByTag = async (req, res) => {
  const { tag } = req.query;

  const tools = await Tool.find({ tags: tag });

  res.status(200).send({ success: true, tools });
};

export const create = async (req, res) => {
  const { title, link, description, tags } = req.body;

  const toolExists = await Tool.findOne({ title });

  if (toolExists) {
    return res
      .status(400)
      .send({ success: false, message: 'tools already registered' });
  }

  const tool = new Tool({ title, link, description, tags });

  await tool.save();

  res.status(201).send({ success: true, tool });
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    await Tool.findByIdAndDelete(id);

    res
      .status(204)
      .send({ success: true, message: 'tool successfully deleted' });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: 'error when deleting tool',
      error: err.message,
    });
  }
};
