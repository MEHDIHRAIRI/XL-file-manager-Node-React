const {
  linkFileToUser,
  updateExcelFileService,
} = require("../service/fileManager");

const linkFile = async (req, res) => {
  const file = await linkFileToUser(req.userId, req.body.fileName);

  res.status(200).json({ file });
};

const updateExcelFile = async (req, res) => {
  const data = await updateExcelFileService(req.body.data, req.body.fileName);
  if (!data) return res.status(400).json({ data });
  res.status(200).json({ data });
};

module.exports = { linkFile, updateExcelFile };
