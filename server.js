require('dotenv').config();

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./user')

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
const url = process.env.URL_MONGOOSE;

mongoose.connect(url).then(() => {
    console.log('Connexion a la base de donnees reussie')
}).catch((error) => {
    console.log('erreur de connexion a bd', error);
})

app.use("/api/user", userRoute)

app.listen(port, ()=> {
    console.log("Server started at ", port);
})