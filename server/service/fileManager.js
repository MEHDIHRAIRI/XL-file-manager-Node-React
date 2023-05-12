const { User } = require("../models/user");

const linkFileToUser = async (userId, fileName) => {
  const filePath = `../../uploads/${fileName}`;
  const file = {
    fileName: fileName,
    filePath: filePath,
  };
  console.log("userId: ", userId);
  console.log("file: ", file);

  const updatedFileName = await User.findByIdAndUpdate(userId, { file: file });
  if (!updatedFileName) throw BadRequestError;
};

module.exports = { linkFileToUser };
