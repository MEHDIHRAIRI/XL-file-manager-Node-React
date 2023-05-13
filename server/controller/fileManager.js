const { linkFileToUser } = require("../service/fileManager");

const date_de_naissance_minimale = new Date("23 Dec 2002");

const opfMin = 101;
const opfMaxNonInstitutionnel = 40000;
const opfMaxInstitutionnel = 40000;

const pgMin = 700;
const pgMaxNonInstitutionnel = 1000;
const pgMaxInstitutionnel = 1000;

const autreMin = 101;
const autreMaxNonInstitutionnel = 20;
const autreMaxInstitutionnel = 20;

const linkFile = async (req, res) => {
  const file = await linkFileToUser(req.userId, req.body.fileName);
  file.fileData.map((ligne) => {
    validateCIN(ligne);
    validateRNE(ligne);
    validateREF(ligne);
    validateQte(ligne);
    validateCategorie(ligne);
    validateInstitutionnel(ligne);
    validateDateDeNaissance(ligne);
    validateQteValues(ligne);
  });
  res.status(200).json({ file });
};

const validateQteValues = (ligne) => {
  if (
    ligne.Categorie !== 0 &&
    ligne.Categorie !== "" &&
    ligne.Categorie !== null
  ) {
    if (
      ligne.Categorie !== null &&
      ligne.Categorie !== "" &&
      ligne.Categorie !== undefined &&
      !ligne.Categorie.search("PG")
    ) {
      if (
        ligne.Institutionnel == "Non" &&
        (ligne.Institutionnel !== null || ligne.Institutionnel !== undefined)
      ) {
        if (ligne.Qte < pgMin || ligne.Qte > pgMaxNonInstitutionnel) {
          ligne.validateQteValue = false;
          return ligne;
        } else ligne.validateQteValue = true;
        return ligne;
      }
      if (
        ligne.Institutionnel == "Oui" &&
        (ligne.Institutionnel !== null || ligne.Institutionnel !== undefined)
      ) {
        if (ligne.Qte < pgMin || ligne.Qte > pgMaxInstitutionnel) {
          ligne.validateQteValue = false;
          return ligne;
        } else ligne.validateQteValue = true;
        return ligne;
      }
    }

    if (
      ligne.Categorie !== null &&
      ligne.Categorie !== "" &&
      ligne.Categorie !== undefined &&
      !ligne.Categorie.search("OPF")
    ) {
      if (
        ligne.Institutionnel == "Non" &&
        (ligne.Institutionnel !== null || ligne.Institutionnel !== undefined)
      ) {
        if (ligne.Qte < opfMin || ligne.Qte > opfMaxNonInstitutionnel) {
          ligne.validateQteValue = false;
          return ligne;
        } else ligne.validateQteValue = true;
        return ligne;
      }
      if (
        ligne.Institutionnel == "Oui" &&
        (ligne.Institutionnel !== null || ligne.Institutionnel !== undefined)
      ) {
        if (ligne.Qte < opfMin || ligne.Qte > opfMaxInstitutionnel) {
          ligne.validateQteValue = false;
          return ligne;
        } else ligne.validateQteValue = true;
        return ligne;
      }
    }

    if (
      ligne.Categorie !== null &&
      ligne.Categorie !== "" &&
      ligne.Categorie !== undefined
    ) {
      if (
        ligne.Institutionnel == "Non" &&
        (ligne.Institutionnel !== null || ligne.Institutionnel !== undefined)
      ) {
        if (ligne.Qte < autreMin || ligne.Qte > autreMaxNonInstitutionnel) {
          ligne.validateQteValue = false;
          return ligne;
        } else ligne.validateQteValue = true;
        return ligne;
      }
      if (
        ligne.Institutionnel == "Oui" &&
        (ligne.Institutionnel !== null || ligne.Institutionnel !== undefined)
      ) {
        if (ligne.Qte < autreMin || ligne.Qte > autreMaxInstitutionnel) {
          ligne.validateQteValue = false;
          return ligne;
        } else ligne.validateQteValue = true;
        return ligne;
      }
    }
  } else return false;
};

const validateDateDeNaissance = (ligne) => {
  if (ligne.Date_de_naissance > date_de_naissance_minimale) {
    ligne.validateDateDeNaissance = false;
  } else {
    ligne.validateDateDeNaissance = true;
    console.log(date_de_naissance_minimale);
  }
  return ligne;
};

const validateInstitutionnel = (ligne) => {
  if (ligne.Institutionnel !== "Non" && ligne.Institutionnel !== "Oui") {
    ligne.validInstitutionnel = false;
  } else {
    ligne.validInstitutionnel = true;
  }
  return ligne;
};

const validateQte = (ligne) => {
  if (ligne.Qte == null || ligne.Qte == 0) {
    ligne.validQte = false;
  } else {
    ligne.validQte = true;
  }
  return ligne;
};

const validateCategorie = (ligne) => {
  if (ligne.Categorie == null || ligne.Categorie == 0) {
    ligne.validCategorie = false;
  } else {
    ligne.validCategorie = true;
  }
  return ligne;
};

const validateRNE = (ligne) => {
  if (
    ligne.Nom.search("Sté") == false &&
    (ligne.RNE == null || ligne.RNE == "")
  ) {
    ligne.validRNE = false;
  } else {
    ligne.validRNE = true;
  }
  return ligne;
};

const validateREF = (ligne) => {
  if (ligne.Categorie !== null && ligne.Categorie !== undefined) {
    if (
      (!ligne.Categorie.search("OPF") ||
        !ligne.Categorie.search("PG") ||
        !ligne.Categorie.search("étrangé") ||
        !ligne.Categorie.search("Etrange")) &&
      (ligne.Ref === 0 || typeof ligne.Ref !== "number" || ligne.Ref == null)
    ) {
      ligne.validRef = false;
    } else {
      ligne.validRef = true;
    }
  }
  return ligne;
};

const validateCIN = (ligne) => {
  if (ligne.CIN.toString().length !== 8) {
    ligne.validCIN = false;
  } else {
    ligne.validCIN = true;
  }
  return ligne;
};

module.exports = { linkFile };
