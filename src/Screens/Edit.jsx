import React, { useState, useEffect } from "react";
import {
  Button,
  Link,
  makeStyles,
} from "@material-ui/core";
import { TextInput, Title } from "../Components";

import { updateUser, getUser } from "../Utils/api";

import Container from "./Styles/Container";

import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Edit = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = useState(JSON.parse(localStorage.getItem('user')));

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setErrorMessage("");
    const { value, name } = e.target;
    switch (name) {
      case "nombre":
        setNombre(value);
        break;
      case "apellido":
        setApellido(value);
        break;
      case "email":
        setEmail(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    getUser().then(response => {
      if (response.data.error) {
        console.log(response.data.message);
      } else {
        console.log(response.data);
        setNombre(response.data.nombre);
        setApellido(response.data.apellido);
        setEmail(response.data.mail);
      }
    });
  }, []);

  const actualizar = () => {
    setErrorMessage("");
    updateUser(nombre, apellido, email).then(value => {
      if (value.error) {
        alert(value.message);
      } else {
        alert("Datos cambiados con éxito!");
      }
    });
  };

  console.log(apellido);

  return (
    <Container >
      <Title text="Editar usuario" white />

      <form className={classes.form} noValidate>
        <TextInput
          id={"nombre"}
          onChange={handleInput}
          defaultValue={nombre}
          label={"Nombre"}
          name={"nombre"}
        />
        <TextInput
          id={"apellido"}
          onChange={handleInput}
          defaultValue={apellido}
          label={"Apellido"}
          name={"apellido"}
        />
        <TextInput
          id={"email"}
          onChange={handleInput}
          defaultValue={email}
          label={"Email"}
          name={"email"}
          type={"email"}
        />

        {errorMessage && <div style={{ color: "red" }}> {errorMessage} </div>}

        <Button
          fullWidth
          disabled={
            !nombre ||
            !apellido ||
            !email ||
            errorMessage
          }
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={actualizar}
        >
          ACTUALIZAR USUARIO
        </Button>
        <Link
          href="/"
          variant="body2"
          onClick={() => {
            history.push("/");
          }}
        >
          {"Volver"}
        </Link>
      </form>
    </Container>
  );
};

export default Edit;
