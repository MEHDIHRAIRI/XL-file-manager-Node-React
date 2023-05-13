const { linkFileToUser } = require("../service/fileManager");

const linkFile = async (req, res) => {
  const file = await linkFileToUser(req.userId, req.body.fileName);
  file.fileData.map((ligne) => {
    validateCIN(ligne);
    validateRNE(ligne);
    validateREF(ligne);
    console.log(Date.parse(ligne.Date_de_naissance));
    if (ligne.Categorie == null || ligne.Categorie == 0) {
      ligne.validCategorie = false;
    } else {
      ligne.validCategorie = true;
    }
    if (ligne.Qte == null || ligne.Qte == 0) {
      ligne.validQte = false;
    } else {
      ligne.validQte = true;
    }
    if (ligne.Institutionnel !== "Non" && ligne.Institutionnel !== "Oui") {
      ligne.validInstitutionnel = false;
    } else {
      ligne.validInstitutionnel = true;
    }
  });
  console.log(file.fileData);
  res.status(200).json({ file });
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
