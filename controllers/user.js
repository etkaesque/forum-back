const uniqid = require("uniqid");
const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.SIGN_UP = async (req, res) => {

  const user = await userModel.findOne({ email: req.body.email });

  if (user) {
    return res.status(401).json({ response: "User already exists" });
  }

  const email = req.body.email;
  const name = req.body.name;
  const formatedName = name[0].toUpperCase() + name.slice(1);
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;

  if(password != confirm_password) {
    return res.status(401).json({ response: "Password doesn't match." });
  }

  function checkIfPasswordGood(password) {
    if (password.length < 6) {
      return false;
    }

    const passArr = password.split("");

    for (let i = 0; i < passArr.length; i++) {
      if (!isNaN(Number(passArr[i]))) {
        return !isNaN(Number(passArr[i]));
      }
    }

    return false;
  }

  const isPasswordGood = checkIfPasswordGood(password);

  if (!email.includes("@") && !isPasswordGood) {
    return res.status(400).json({
      email: false,
      password: false,
      response:
        "Invalid email format. Password has to be at least 6 symbols including a number",
    });
  } else if (!email.includes("@")) {
    return res
      .status(400)
      .json({ email: false, response: "Invalid email format." });
  } else if (!isPasswordGood) {
    return res.status(400).json({
      password: false,
      response: "Password has to be at least 6 symbols including a number",
    });
  }

  bcrypt.hash(password, 10, async function (err, hash) {
    const user = new userModel({
      id: uniqid(),
      name: formatedName,
      email: email,
      password: hash,
      photo: req.body.photo,
      asked: [],
      answered: [],
      likedAnswers: [],
      dislikedAnswers: []

    });

    await user.save();

    const jwt_token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "8h" },
      {
        algorithm: "RS256",
      }
    );

    const jwt_refresh_token = jwt.sign(
      {
        email: user.email,
        id: user.id,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      {
        algorithm: "RS256",
      }
    );

    return res.status(200).json({
      response: "User was saved successfully",
      jwt_token: jwt_token,
      jwt_refresh_token: jwt_refresh_token,
    });
  });
};

module.exports.LOGIN = async (req, res) => {

  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ message: "Wrong password or email" });
    }

    bcrypt.compare(req.body.password, user.password, (err, isPasswordGood) => {
      if (isPasswordGood) {
        const jwt_token = jwt.sign(
          {
            email: user.email,
            id: user.id,
            name:user.name
          },
          process.env.JWT_SECRET,
          { expiresIn: "8h" },
          {
            algorithm: "RS256",
          }
        );

        const jwt_refresh_token = jwt.sign(
          {
            email: user.email,
            id: user.id,
            name:user.name
          },
          process.env.JWT_SECRET,
          { expiresIn: "24h" },
          {
            algorithm: "RS256",
          }
        );

        return res.status(200).json({
          message: "User authenticated successfully",
          jwt_token: jwt_token,
          jwt_refresh_token: jwt_refresh_token,
        });

      } else {
        return res.status(404).json({ message: "Wrong password or email" });
      }
    });
  } catch(error) {
    return res.status(500).json({ message: "Something went wrong while logging in." });
  }
};

module.exports.GET_JWT_TOKEN = async (req, res) => {
  

  try {
    const jwt_token = jwt.sign(
      {
        email: req.body.email,
        id: req.body.id,
        name:req.body.name 
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
      {
        algorithm: "RS256",
      }
    );
  
    return res.status(200).json({
      response: "JWT refresh token is valid. ",
      jwt_token: jwt_token,
      id: req.body.id,
    });

  } catch (error) {

    return res.status(401).json({error})

  }
  
};

module.exports.GET_USER_BY_ID = async (req, res) => {
 
  try {
    const user = await userModel.findOne({ id: req.body.id });
    if (!user) {
      return res.status(404).json({ response: "User was not found" });
    }
    return res.status(200).json({ user: user });
  } catch {
    return res.status(401).json({ response: "Something went wrong" });
  }
};

