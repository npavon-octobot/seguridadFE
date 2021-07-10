import React, { useState } from "react";
import {
  Button,
  Link,
  makeStyles,
} from "@material-ui/core";
import { TextInput, Title } from "../Components";

import { updateUserPassword } from "../Utils/api";

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

const EditPassword = () => {
  const classes = useStyles();
  const history = useHistory();
  const user = useState(JSON.parse(localStorage.getItem('user')));

  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const [passwordError, setPassowrdError] = useState(false);

  const handleInput = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "newPassword":
        setNewPassword(value);
        setPassowrdError(value.length < 5);
        break;
      case "oldPassword":
        setOldPassword(value);
        break;
      default:
        break;
    }
  };

  const actualizar = () => {
    updateUserPassword(oldPassword, newPassword).then(value => {
      if (value.error) {
        alert(value.message);
      } else {
        alert("Contraseña cammbiada con éxito!");
      }
    });
  };


  return (
    <Container >
      <Title text="Cambiar contraseña" white />

      <form className={classes.form} noValidate>
        <TextInput
          id={"oldPassword"}
          onChange={handleInput}
          label={"Contraseña anterior"}
          name={"oldPassword"}
          error={passwordError}
          type={"password"}
        />
        <TextInput
          id={"newPassword"}
          onChange={handleInput}
          label={"Nueva contraseña"}
          name={"newPassword"}
          error={passwordError}
          errorMessage={"Ingrese un contraseña mas larga"} // FIXME: otros errores?
          type={"password"}
        />

        {passwordError && <div style={{ color: "red" }}> {passwordError} </div>}

        <Button
          fullWidth
          disabled={
            !newPassword ||
            !oldPassword ||
            passwordError
          }
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={actualizar}
        >
          ACTUALIZAR CONTRASEñA
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

export default EditPassword;
