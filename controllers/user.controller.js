const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    let salt = 10;
    const saltRound = await bcrypt.genSalt(salt);

    const hashedPassword = await bcrypt.hash(password, saltRound);
    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    const token = await jwt.sign({ id: user._id, role:user.role }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    res.status(201).send({
      message: "user created successfully",
      data: {
        firstname,
        lastname,
        email,
      },
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(400).send({
      message: "Account creation failed",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await UserModel.findOne({ email });

    if (!isUser) {
      res.status(404).send({
        message: "Invalid credentials",
      });

      return;
    }
    console.log(isUser);

    const isMatch = await bcrypt.compare(password, isUser.password);
    if (!isMatch) {
      res.status(404).send({
        message: "Invalid credentials",
      });
      return;
    }

    const token = await jwt.sign({ id: isUser._id, role:isUser.role }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });
    res.status(200).send({
      message: "User login successful",
      data: {
        firstname: isUser.firstname,
        lastname: isUser.lastname,
        email: isUser.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({
      message: "Invalid credentials",
    });
  }
};

const getUsers = async (req, res) => {
  const {id, role}= req.user

  try {
    let user = await UserModel.find().select("-password");
    if(role!=="admin"){
      res.status(403).send({
        message:"forbidden request"
      })

      return
    }

    res.status(200).send({
      message: "All users fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);

    res.status(404).send({
      message: "cannot get users at this time",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await UserModel.findByIdAndDelete(id);

    res.status(204).send({
      message: "User deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      message: "User cannot be deleted",
    });
  }
};

//to save user, create the user with hashed password before saving it into the data base
//Authentication and authorization

const verifyUser = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]
    ? req.headers.authorization.split(" ")[1]
    : req.headers.authorization.split(" ")[0];

    console.log(token);
    

     jwt.verify(token, process.env.JWT_SECRET, function(err, decoded){
      if(err){
        res.status(401).send({
          message:"user unauthorized"
        })

        return
      }

      console.log(decoded);
      
      req.user = decoded

      next()
    })
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message:"user unauthorized"
    })

  }
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  login,
  verifyUser
};
