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
    emptyValue: () => <em>N/A</em>,
  },
  {
    title: "IDT",
    field: "IDT",
    emptyValue: () => <em>N/A</em>,
  },
  {
    title: "Teneur_de_compte",
    field: "Teneur_de_compte",
    emptyValue: () => <em>N/A</em>,
  },
  {
    title: "Nom",
    field: "Nom",
    emptyValue: () => <em>N/A</em>,
  },
  {
    title: "Prenom",
    field: "Prenom",
    emptyValue: () => <em>N/A</em>,
  },
  {
    title: "Ref",
    field: "Ref",
    emptyValue: () => <em>N/A</em>,
  },
  {
    title: "RNE",
    field: "RNE",
    emptyValue: () => <em>N/A</em>,
    render: (rowData) => {
      if (!rowData.validRNE) {
        return <div style={{ background: "red" }}>{rowData.RNE}</div>;
      }
      return <div>{rowData.RNE}</div>;
    },
  },
  {
    title: "CMF",
    field: "CMF",
    emptyValue: () => <em>N/A</em>,
  },
  {
    title: "CIN",
    field: "CIN",
    emptyValue: () => <em>N/A</em>,
    render: (rowData) => {
      if (!rowData.validCIN) {
        return <div style={{ background: "red" }}>{rowData.CIN}</div>;
      }
      return <div>{rowData.CIN}</div>;
    },
  },
  {
    title: "Date_de_naissance",
    field: "Date_de_naissance",
    type: "date",
    emptyValue: () => <em>N/A</em>,
    render: (rowData) => {
      if (!rowData.validateDateDeNaissance) {
        return (
          <div style={{ background: "red" }}>{rowData.Date_de_naissance}</div>
        );
      }
      return <div>{rowData.Date_de_naissance}</div>;
    },
  },
  {
    title: "Qte",
    field: "Qte",
    emptyValue: () => <em>N/A</em>,
    render: (rowData) => {
      if (!rowData.validQte) {
        return <div style={{ background: "red" }}>{rowData.Qte}</div>;
      }
      return <div>{rowData.Qte}</div>;
    },
  },
  {
    title: "Categorie",
    field: "Categorie",
    emptyValue: () => <em>N/A</em>,
    render: (rowData) => {
      if (!rowData.validCategorie) {
        return <div style={{ background: "red" }}>{rowData.Categorie}</div>;
      }
      return <div>{rowData.Categorie}</div>;
    },
  },
  {
    title: "Institutionnel",
    field: "Institutionnel",
    emptyValue: () => <em>N/A</em>,
    render: (rowData) => {
      if (!rowData.validInstitutionnel) {
        return (
          <div style={{ background: "red" }}>{rowData.Institutionnel}</div>
        );
      }
      return <div>{rowData.Institutionnel}</div>;
    },
  },
];

const Main = () => {
  const [fileName, setFileName] = useState("");
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [data, setdata] = useState([]);

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
    setdata(fileAdded.data.file.fileData);
    console.log(fileAdded.data.file.fileData);
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
          <MaterialTable
            data={data}
            title="Tasks List"
            columns={columns}
            icons={tableIcons}
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
