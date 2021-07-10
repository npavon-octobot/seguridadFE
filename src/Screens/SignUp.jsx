import React, { useState } from "react";
import {
  Button,
  Link,
  makeStyles,
  Container,
} from "@material-ui/core";
import { TextInput, Title } from "../Components";

import { register } from "../Utils/api";

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

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();

  const [username, setUserName] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPassowrdError] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const handleInput = (e) => {
    setErrorMessage("");
    const { value, name } = e.target;
    switch (name) {
      case "username":
        setUserName(value);
        setUsernameError(!value);
        break;
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

  const registrarse = () => {
    setErrorMessage("");
    register(username, password, nombre, apellido, email).then(value => {
      if (value.error) {
        console.log(value.message);
      } else {
        history.push("/signin");
      }
    });
    // FIXME: validar otros errores
  };


  return (
    <Container component="main" maxWidth="xs">
      <Title text=" Crear Cuenta" white />

      <form className={classes.form} noValidate>
        <TextInput
          id={"username"}
          onChange={handleInput}
          label={"Nombre de usuario"}
          name={"username"}
          error={usernameError}
          errorMessage={"Ingrese un nombre de usuario valido"}
          type={"text"} // puede estar mal
        />
        <TextInput
          id={"nombre"}
          onChange={handleInput}
          label={"Nombre"}
          name={"nombre"}
        />
        <TextInput
          id={"apellido"}
          onChange={handleInput}
          label={"Apellido"}
          name={"apellido"}
        />
        <TextInput
          id={"email"}
          onChange={handleInput}
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
          fullWidth
          disabled={
            !username ||
            !nombre ||
            !apellido ||
            !email ||
            !password ||
            passwordError ||
            usernameError ||
            errorMessage
          }
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={registrarse}
        >
          CREAR CUENTA
        </Button>
        <Link
          href="/signin"
          variant="body2"
          onClick={() => {
            history.push("/signin");
          }}
        >
          {"¿Ya estas registrado? Ingresar"}
        </Link>
      </form>
    </Container>
  );
};

export default SignUp;
