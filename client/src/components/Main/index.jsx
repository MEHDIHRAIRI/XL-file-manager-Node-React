import { useEffect, useState, forwardRef } from "react";
import styles from "./styles.module.css";

import { addFile } from "../../service/fileService";
import MaterialTable from "material-table";
import {
  ViewColumn,
  Search,
  SaveAlt,
  Remove,
  LastPage,
  FirstPage,
  FilterList,
  Edit,
  DeleteOutline,
  Clear,
  ChevronRight,
  ChevronLeft,
  Check,
  ArrowDownward,
  AddBox,
} from "@material-ui/icons";
import axios from "axios";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const columns = [
  {
    title: "ID",
    field: "ID",
    emptyValue: () => <em style={{ color: "red" }}>N/A</em>,
  },
  {
    title: "IDT",
    field: "IDT",
    emptyValue: () => <em style={{ color: "red" }}>N/A</em>,
  },
  {
    title: "Teneur_de_compte",
    field: "Teneur_de_compte",
    emptyValue: () => <em style={{ color: "red" }}>N/A</em>,
  },
  {
    title: "Nom",
    field: "Nom",
    emptyValue: () => <em style={{ color: "red" }}>N/A</em>,
  },
  {
    title: "Prenom",
    field: "Prenom",
    emptyValue: () => <em style={{ color: "red" }}>N/A</em>,
  },
  {
    title: "Ref",
    field: "Ref",
    emptyValue: () => <em style={{ color: "red" }}>N/A</em>,
    render: (rowData) => {
      if (!rowData.validRef) {
        return <div style={{ color: "red" }}>{rowData.Ref}</div>;
      }
      return <div>{rowData.Ref}</div>;
    },
  },
  {
    title: "RNE",
    field: "RNE",
    emptyValue: () => <em style={{ color: "red" }}>N/A</em>,
    render: (rowData) => {
      if (!rowData.validRNE) {
        return <div style={{ color: "red" }}>{rowData.RNE}</div>;
      }
      return <div>{rowData.RNE}</div>;
    },
  },
  {
    title: "CMF",
    field: "CMF",
    emptyValue: () => <em style={{ color: "red" }}>N/A</em>,
  },
  {
    title: "CIN",
    field: "CIN",
    emptyValue: () => <em style={{ color: "red" }}>N/A</em>,
    render: (rowData) => {
      if (!rowData.validCIN) {
        return <div style={{ color: "red" }}>{rowData.CIN}</div>;
      }
      return <div>{rowData.CIN}</div>;
    },
  },
  {
    title: "Date_de_naissance",
    field: "Date_de_naissance",
    type: "date",
    emptyValue: () => <em style={{ color: "red" }}>N/A</em>,
    render: (rowData) => {
      if (!rowData.validateDateDeNaissance) {
        return <div style={{ color: "red" }}>{rowData.Date_de_naissance}</div>;
      }
      return <div>{rowData.Date_de_naissance}</div>;
    },
  },
  {
    title: "Qte",
    field: "Qte",
    emptyValue: () => <em style={{ color: "red" }}>N/A</em>,
    render: (rowData) => {
      if (!rowData.validQte) {
        return <div style={{ color: "red" }}>{rowData.Qte}</div>;
      }
      return <div>{rowData.Qte}</div>;
    },
  },
  {
    title: "Categorie",
    field: "Categorie",
    emptyValue: () => <em style={{ color: "red" }}>N/A</em>,
    render: (rowData) => {
      if (!rowData.validCategorie) {
        return <div style={{ color: "red" }}>{rowData.Categorie}</div>;
      }
      return <div>{rowData.Categorie}</div>;
    },
  },
  {
    title: "Institutionnel",
    field: "Institutionnel",
    emptyValue: () => <em style={{ color: "red" }}>N/A</em>,
    render: (rowData) => {
      if (!rowData.validInstitutionnel) {
        return <div style={{ color: "red" }}>{rowData.Institutionnel}</div>;
      }
      return <div>{rowData.Institutionnel}</div>;
    },
  },
];

const Main = () => {
  const [fileName, setFileName] = useState("");
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

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
    const fileAdded = await addFile(fileName, token);
    setData(fileAdded.data.file.fileData);
  };

  const handleRowUpdate = async (newData, oldData) => {
    let dataUpdate = [...data];
    const index = oldData.ID;
    dataUpdate.map((ligne) => {
      if (ligne.ID === index) {
        ligne.CIN = newData.CIN;
        ligne.CMF = newData.CMF;
        ligne.Date_de_naissance = newData.Date_de_naissance;
        ligne.IDT = newData.IDT;
        ligne.Institutionnel = newData.Institutionnel;
        ligne.Nom = newData.Nom;
        ligne.Prenom = newData.Prenom;
        ligne.Qte = newData.Qte;
        ligne.RNE = newData.RNE;
        ligne.Ref = newData.Ref;
        ligne.Teneur_de_compte = newData.Teneur_de_compte;
        ligne.Categorie = newData.Categorie;
      }
    });
    const token = localStorage.getItem("token");
    // Save changes to database
    axios
      .put(
        "http://localhost:5000/api/managFile/update",
        { data: dataUpdate, fileName },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((response) => setData(response.data))
      .catch((error) => console.error(error));
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
        <div>
          <div className={styles.selectDiv}>
            <div>
              <b>Import Excel File:</b>
              <input
                type="file"
                className={styles.fileSelect} // add CSS class for styling
                onChange={(e) => fileChange(e)}
              />
              <button
                className={styles.submitButton} // add CSS class for styling
                onClick={handleSubmit}
              >
                Submit file
              </button>
            </div>
          </div>
          <MaterialTable
            editable={{
              onRowUpdate: handleRowUpdate,
            }}
            data={data}
            title="Bourse de la tunisie"
            columns={columns}
            icons={tableIcons}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
