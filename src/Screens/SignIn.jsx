import React, { useState } from "react";
import { Button, Link, makeStyles, Container } from "@material-ui/core";
import { TextInput, Title } from "../Components";
import { login } from "../Utils/api";
import { useHistory } from "react-router-dom";

import Containerr from "./Styles/Container";

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (e) => {
    setErrorMessage("");
    const { value, name } = e.target;
    if (name === "username") {
      setUserName(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const iniciarSesion = () => {
    setErrorMessage("");
    login(username, password).then(value => {
      if(value.error){
        console.log(value.message);
      }else{
        history.push("/");
      }
    });
  };

  return (
    <Containerr >
      <Title text="Ingresar" white h2 />

      <form noValidate>
        <TextInput
          id={"username"}
          onChange={handleInput}
          label={"Nombre de usuario"}
          name={"username"}
          type={"text"}
        />
        <TextInput
          id={"password"}
          onChange={handleInput}
          label={"Contraseña"}
          name={"password"}
          type={"password"}
        />

        {errorMessage && <div style={{ color: "red" }}> {errorMessage} </div>}

        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={iniciarSesion}
        >
          Iniciar sesion
        </Button>
        <Link
          href="/signup"
          variant="body2"
          onClick={() => {
            history.push("/signup");
          }}
        >
          {"¿No estas registrado? Registrarse"}
        </Link>
      </form>
    </Containerr>
  );
};

export default SignIn;
