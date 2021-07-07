import React, { useState, useEffect } from "react";
import {
  Button,
  Link,
  makeStyles,
} from "@material-ui/core";
import { TextInput, Title } from "../Components";

import { updateUser } from "../Utils/api";

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
  const [password, setPassword] = useState("");

  const [passwordError, setPassowrdError] = useState(false);

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
      case "password":
        setPassword(value);
        setPassowrdError(value.length < 5);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const { data } = updateUser(user.username);
    setNombre(data.nombre);
    setApellido(data.apellido);
    setEmail(data.email);
  }, []);

  const actualizar = () => {
    setErrorMessage("");
    const { data } = updateUser({
      nombre: nombre,
      apellido: apellido,
      email: email,
      password: password, // FIXME: mejorar edicion de contraseña
    });
    // FIXME: validar otros errores
    if (data.message === "Persona ya registrada.") {
      setErrorMessage("Error en registro");
    } else {
      history.push("/signin");
    }
  };


  return (
    <Container >
      <Title text=" Crear Cuenta" white />

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
        <TextInput
          id={"password"}
          onChange={handleInput}
          label={"Contraseña"}
          name={"password"}
          error={passwordError}
          errorMessage={"Ingrese un contraseña mas larga"} // FIXME: otros errores?
          type={"password"}
        />

        {errorMessage && <div style={{ color: "red" }}> {errorMessage} </div>}

        <Button
          type="submit"
          fullWidth
          disabled={
            !nombre ||
            !apellido ||
            !email ||
            !password ||
            passwordError ||
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
