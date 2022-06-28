const { profile, user } = require('../../models');

exports.getProfile = async (req, res) => {
  try {
    const { id } = req.params;

    let data = await profile.findOne({
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
      ],
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    });

    data = JSON.parse(JSON.stringify(data));

    data = {
      ...data,
    };

    res.send({
      status: 'success...',
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 'failed',
      message: 'Server Error',
    });
  }
};
