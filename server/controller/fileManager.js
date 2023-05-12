const { linkFileToUser } = require("../service/fileManager");

const linkFile = async (req, res) => {
  console.log("req.body: ", req);
  const file = await linkFileToUser(req.userId, req.body.fileName);
  res.status(200).json({ file });
};

module.exports = { linkFile };
