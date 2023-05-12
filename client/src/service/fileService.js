import axios from "axios";
const URL = "http://localhost:5000/api/managFile";

export const addFile = async (fileName, token) => {
  return await axios.put(
    URL,
    { fileName: fileName },
    {
      headers: { authorization: `Bearer ${token}` },
    }
  );
};
