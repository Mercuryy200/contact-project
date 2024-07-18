const express = require("express");
const contact = require("./models/contact");
const mongoose = require("mongoose");
const app = express();
const port = 4200;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS,PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-RequestedWith, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(express.static("public"));

//creation de la bd
mongoose
  .connect("mongodb://localhost/contact", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connecté à la BD Mongo..."))
  .catch((error) => console.log("Echec de connexion à la BD Mongo...", error));

// Ajouter un enregistrement dans la DB (CREATE)
app.post("/contact", async (request, response) => {
  console.log("Route POST /contact");
  console.log(request.body);
  try {
    let person = new contact(request.body);
    let result = await person.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
// Obtenir la liste des enregistrement contenu dans la DB (READ)
app.get("/contacts", async (request, response) => {
  console.log("Route GET /contacts");
  try {
    let result = await contact.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
// Obtenir un enregistrement en particulier dans la DB (READ)
app.get("/contact/:id", async (request, response) => {
  console.log("Route GET /contact/:id");
  try {
    let person = await contact.findById(request.params.id).exec();
    response.send(person);
  } catch (error) {
    response.status(500).send(error);
  }
});

// Mettre à jour un enregistrement dans la DB (UPDATE)
app.put("/contact/:id", async (request, response) => {
  console.log("Route PUT /contact/:id");
  console.log(request.body);
  try {
    let person = await contact.findById(request.params.id).exec();
    person.set(request.body);
    let result = await person.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
// Effacer un enregistrement (EFFACER)
app.delete("/contact/:id", async (request, response) => {
  try {
    let result = await contact
      .deleteOne({
        _id: request.params.id,
      })
      .exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});
app.listen(port, () => {
  console.log(`Serveur en écoute sur le port ${port}...`);
});
