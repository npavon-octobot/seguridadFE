import React, { useState, useEffect } from "react";
import {
  Button,
} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import "moment/locale/es";
import { useHistory } from "react-router-dom";
import { Title } from "../Components";

import { getUsers } from "../Utils/api";
import Container from "./Styles/Container";

const Admin = () => {
  const history = useHistory();
  const user = useState(JSON.parse(localStorage.getItem('user')));
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.admin);// FIXME: admin?
    }
  }, []);

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  if (!user.TOKENMAGICO || !isAdmin) { // FIXME: token
    return (
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "space-evenly",
          height: 500,
        }}
      >
          No tienes permiso para acceder a esta página
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => {
            history.push("/");
          }}
        >
          Regresar
        </Button>
      </div>
    );
  }

  return (
    <Container>
        <Title text="Admin" /> 
        {DataTable(users)}
        <Button
          type="submit"
          variant="contained"
          size="medium"
          color="primary"
          onClick={() => {
            localStorage.clear();
          }}
        >
          Salir
        </Button>
    </Container>
  );
};

export default Admin;


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  },
];


const DataTable = (rows) => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={1000} checkboxSelection />
    </div>
  );
}
