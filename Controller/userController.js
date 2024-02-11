import { userModel } from "../Model/user.js";

const createUserController = async (req, res) => {
  try {
    const { firstName, lastName, age, email, qualification, password } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !age ||
      !email ||
      !qualification ||
      !password
    ) {
      return res.status(400).send({
        status: false,
        statusCode: 400,
        message: "Please provide all the required field",
      });
    }

    const user = await userModel.create({
      firstName,
      lastName,
      age,
      email,
      qualification,
      password,
    });

    res.status(200).send({
      status: true,
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

const getAllUsersController = async (req, res) => {
  try {
    const user = await userModel.find({});
    if (user) {
      res.status(200).send({
        status: true,
        statusCode: 200,
        data: user,
      });
    } else {
      res.status(400).send({
        status: false,
        statusCode: 400,
        message: "Users Not Found",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userModel.findById(id);
    if (user) {
      res.status(200).send({
        status: true,
        statusCode: 200,
        data: user,
      });
    } else {
      res.status(400).send({
        status: false,
        statusCode: 400,
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

const updateUserByIdController = async (req, res) => {
  try {
    const id = req.params.id;

    const { firstName, lastName, age, email, qualification, password } =
      req.body;

    const user = await userModel.findByIdAndUpdate(id, {
      firstName,
      lastName,
      age,
      email,
      qualification,
      password,
    });
    if (user) {
      res.status(200).send({
        status: true,
        statusCode: 200,
        message: "User Update Successfully",
        data: user,
      });
    } else {
      res.statu(400).send({
        status: false,
        statusCode: 400,
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await userModel.findByIdAndDelete(id);

    if (user) {
      res.status(200).send({
        status: true,
        statusCode: 200,
        data: "User Deleted Successfully",
      });
    } else {
      res.status(400).send({
        status: false,
        statusCode: 400,
        message: "User Not Found",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export {
  createUserController,
  getAllUsersController,
  getUserByIdController,
  updateUserByIdController,
  deleteUserController,
};
