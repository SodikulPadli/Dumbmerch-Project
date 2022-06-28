const { category, productcategory } = require('../../models');

exports.getCategories = async (req, res) => {
  try {
    const data = await category.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    const categories = JSON.parse(JSON.stringify(data));
    res.status(200).send({
      status: 'success...',
      data: {
        categories,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await category.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });
    const Category = JSON.parse(JSON.stringify(data));
    res.status(200).send({
      status: 'success...',
      data: {
        Category,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const data = await category.create(req.body);

    res.status(200).send({
      status: 'success...',
      data: {
        Category: {
          id: data.id,
          name: data.name,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await category.update(req.body, {
      where: {
        id,
      },
    });
    let data = await category.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });
    res.status(200).send({
      status: 'success...',
      data: {
        Category: {
          id: data.id,
          name: data.name,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await category.destroy({
      where: {
        id,
      },
    });

    await productcategory.destroy({
      where: {
        idCategory: id,
      },
    });

    res.send({
      status: 'success',
      message: `Delete category id: ${id} finished`,
      data: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
