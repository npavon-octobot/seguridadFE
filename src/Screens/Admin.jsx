import React, { useState, useEffect } from "react";
import {
  Button,
  Link,
  Checkbox,
} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';
import "moment/locale/es";
import { useHistory } from "react-router-dom";
import { Title } from "../Components";

import { makeAdmin } from "../Utils/api";

import { getUsers } from "../Utils/api";
import Container from "./Styles/Container";

const Admin = () => {
  const history = useHistory();
  const user = useState(JSON.parse(localStorage.getItem('user')));
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'username', headerName: 'Nombre de usuario', width: 150 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'apellido', headerName: 'Apellido', width: 150 },
    { field: 'mail', headerName: 'Email', width: 300 },
    {
      field: 'admin',
      headerName: 'Admin',
      renderCell: (params) => (
          <Checkbox
            checked={params.row.admin}
            onChange={() => changeAdmin(params.row.username)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
      ),
    },
  ];

  const DataTable = (users) => {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={users} columns={columns} pageSize={5}/>
      </div>
    );
  }

  const changeAdmin = (username) => {
    setUsers(users.map(u => {
      if(u.username === username && username !== user[0].sub){
        u.admin = !u.admin;
      }
      return u
    }))
    if(username !== user[0].sub){
      makeAdmin(username).then(value => {
        if (value.error) {
          alert(value.message);
        } else {
          alert("Permisos de admin cambiados");
        }
      });
    }else {
      alert("No puedes quitarte admin");
    }
  }

  useEffect(() => {
    if (user) {
      setIsAdmin(user[0].admin);// FIXME: admin?
    }
  }, []);

  useEffect(() => {
    getUsers().then(response => {
      if (response.data.error) {
        alert(response.data.message)
      } else {
        setUsers(response.data);
      }
    });
  }, []);

  if (!user[0] || !isAdmin) { // FIXME: token
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
        {users && DataTable(users)}
        <Link
          href="/"
          variant="body2"
          onClick={() => {
            history.push("/");
          }}
        >
          {"Volver"}
        </Link>
    </Container>
  );
};

export default Admin;
