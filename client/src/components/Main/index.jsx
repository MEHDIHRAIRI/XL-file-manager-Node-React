import { useEffect, useState } from "react";
import styles from "./styles.module.css";

const Main = () => {
  const [user, setUser] = useState({});
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const fileChange = (e) => {
    var fileName = e.target.files[0].name;
    console.log(fileName);
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
        </div>
      </div>
    </div>
  );
};

export default Main;
