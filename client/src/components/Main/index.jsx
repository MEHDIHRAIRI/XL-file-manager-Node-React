import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { addFile } from "../../service/fileService";

const Main = () => {
  const [fileName, setFileName] = useState("");
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
    setToken(localStorage.getItem("token"));
  }, []);

  const fileChange = (e) => {
    setFileName(e.target.files[0].name);
  };
  const handleSubmit = async () => {
    console.log(fileName);
    const fileAdded = await addFile(fileName, token);
    console.log(fileAdded);
  };
  return (
    <div className={styles.main_container}>
      <nav className={styles.navbar}>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
        <button className={styles.white_btn} onClick={handleLogout}>
          Logout
        </button>
      </nav>
      <div>
        <b>Import Excel File:</b>
        <div>
          <input
            type="file"
            className="fileSelect"
            onChange={(e) => fileChange(e)}
          />
          <button onClick={handleSubmit}>Submit file</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
