const { User } = require("../models/user");
const xlsx = require("xlsx");
const path = require("path");

const linkFileToUser = async (userId, fileName) => {
  const file = {
    fileName: fileName,
    filePath: path.join(__dirname, "..", "..", "uploads/", fileName),
  };
  const fileData = await openAndManageFile(file.filePath);
  const updatedFileName = await User.findByIdAndUpdate(userId, { file: file });
  if (!updatedFileName) throw BadRequestError;
  return { updatedFileName, fileData };
};

const openAndManageFile = async (filePath) => {
  const workbook = xlsx.readFile(filePath, { cellDates: true });
  const sheet_name_list = workbook.SheetNames;

  if (sheet_name_list.length > 1) {
    throw new Error("Multiple sheets are not allowed");
  }

  const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  return data;
};

module.exports = { linkFileToUser };
