const e = require('express');
const pushFormQuery = require ('../db/queries/pushFormQuery');
const { sendMail, generateError } = require ('../helpers');

const newForm = async (req, res, next) => {
  try {
    const { full_name, email, phone, company, country, message } = req.body;

    if (!full_name || !email || !phone || !company || !country) {
      generateError("Tous les champs doivent être remplis.", 400);
    }

    await pushFormQuery(full_name, email, phone, company, country, message);

    const subject =
      "Nouvelle demande d’informations sur les produits Expert Béton.";

    const emailContent = ` 
    Données client de la solitude: 
    
    Nom: ${full_name}
    
    Email: ${email}

    Téléphone: ${phone}

    Société: ${company}

    Pays: ${country}

    Message: ${message}

    Ce message est automatique et a été créé via le formulaire du site Web ExpertBeton.
    `;

    await sendMail(subject,emailContent);
    
    res.status({
      code: 200,
      stats: "ok",
      message: "Form filled ok",
    }).redirect("./produits");

  } catch (err) {
    res.redirect("/form");
    next(err);
  };
};

module.exports = newForm;