require ('dotenv').config();

const express = require ('express');
const morgan = require ('morgan');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join("public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/produits", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "produits.html"));
});

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "form.html"));
});

const newForm = require('./controllers/newForm');

app.post("/form", newForm);

app.get("/politique_de_confidentialite", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'pdc.html'))
});


app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.httpStatus || 500).send({
    status: "error",
    message: err.message,
  });
});

app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: 'Root not found',
  });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening at https://localhost:${PORT}`);
});