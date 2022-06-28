const { product, user, category, productcategory } = require('../../models');

exports.getProducts = async (req, res) => {
  try {
    let data = await product.findAll({
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: category,
          as: 'categories',
          through: {
            model: productcategory,
            as: 'bridge',
            attributes: [],
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });
    data = JSON.parse(JSON.stringify(data));
    products = data.map((item) => {
      return { ...item, image: process.env.PATH_FILE + item.image };
    });
    res.send({
      status: 'success...',
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let data = await product.findOne({
      where: {
        id,
      },

      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: category,
          as: 'categories',
          through: {
            model: productcategory,
            as: 'bridge',
            attributes: [],
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    Product = {
      ...data,
      image: process.env.PATH_FILE + data.image,
    };

    res.status(200).send({
      status: 'success...',
      data: {
        Product,
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

exports.addProduct = async (req, res) => {
  try {
    let { categoryId } = req.body;

    if (categoryId) {
      categoryId = categoryId.split(',');
    }

    const data = {
      name: req.body.name,
      desc: req.body.desc,
      price: req.body.price,
      image: req.file.filename,
      stock: req.body.stock,
      idUser: req.user.id,
    };

    let newProduct = await product.create(data);

    if (categoryId) {
      const productCategoryData = categoryId.map((item) => {
        return { idProduct: newProduct.id, idCategory: parseInt(item) };
      });

      await productcategory.bulkCreate(productCategoryData);
    }

    let productData = await product.findOne({
      where: {
        id: newProduct.id,
      },
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: category,
          as: 'categories',
          through: {
            model: productcategory,
            as: 'bridge',
            attributes: [],
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });
    productData = JSON.parse(JSON.stringify(productData));

    res.send({
      status: 'success...',
      data: {
        ...productData,
        image: process.env.PATH_FILE + productData.image,
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

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    let { categoryId } = req.body;
    categoryId = await categoryId.split(',');

    const data = {
      name: req?.body?.name,
      desc: req?.body.desc,
      price: req?.body?.price,
      image: req?.file?.filename,
      stock: req?.body?.stock,
      idUser: req?.user?.id,
    };

    await productcategory.destroy({
      where: {
        idProduct: id,
      },
    });

    let productCategoryData = [];
    if (categoryId != 0 && categoryId[0] != '') {
      productCategoryData = categoryId.map((item) => {
        return { idProduct: parseInt(id), idCategory: parseInt(item) };
      });
    }

    if (productCategoryData.length != 0) {
      await productcategory.bulkCreate(productCategoryData);
    }

    await product.update(data, {
      where: {
        id,
      },
    });

    res.status(200).send({
      status: 'success',
      data: {
        id,
        data,
        productCategoryData,
        image: req?.file?.filename,
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

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await product.destroy({
      where: {
        id,
      },
    });

    res.status(200).send({
      status: 'success',
      data: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};

exports.searchProduct = async (req, res) => {
  try {
    let data = await product.findAll({
      include: [
        {
          model: user,
          as: 'user',
          attributes: {
            exclude: ['createdAt', 'updatedAt', 'password'],
          },
        },
        {
          model: category,
          as: 'categories',
          through: {
            model: productcategory,
            as: 'bridge',
            attributes: [],
          },
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'idUser'],
      },
    });
    data = JSON.parse(JSON.stringify(data));
    products = data.map((item) => {
      return { ...item, image: process.env.PATH_FILE + item.image };
    });
    res.send({
      status: 'success...',
      data: {
        products,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
