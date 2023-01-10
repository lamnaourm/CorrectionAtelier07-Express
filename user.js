const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("./models/UserSchema");

const routes = express.Router();

routes.post("/add", (req, res) => {
  const { login, firstname, lastname, mail, password } = req.body;

  if (!login || !firstname || !lastname || !mail || !password)
    return res.status(401).json({ message: "Donnees user manquant" });

  bcrypt.genSalt(10, (err, salt) => {
    if (!err)
      bcrypt.hash(password, salt, (err, hash) => {
        if (!err) {
          const user = new userModel({
            login,
            firstname,
            lastname,
            mail,
            password: hash,
          });
          user.save((err, data) => {
            if (!err)
              return res
                .status(200)
                .json({ message: "user cree avec succes", user: data });
            else return res.status(500).json({ message: "erreur de creation" });
          });
        }
      });
  });
});

routes.get("/checklogin", (req, res) => {
  const { login, password } = req.body;

  if (!login || !password)
    return res.status(401).json({ message: "Donnees user manquant" });

  userModel.findOne({ login }, (err, user) => {
    if(err){
      return res.status(500).json({ message: "erreur de lecture des donnees" });
    }else {
      if(user){
        console.log(user);
        bcrypt.compare(password, user.password, (err, resultat) => {
          if(resultat)
            return res.status(200).json({ message: "SUCCESS" });
          else 
            return res.status(500).json({ message: "ECHEC" });
        })
      }else 
        return res.status(404).json({ message: "Login inexistant" });
    }
  });
});

routes.get("/checkemail", (req, res) => {});

module.exports = routes;
