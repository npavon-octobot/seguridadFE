import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  makeStyles,
} from "@material-ui/core";
import "moment/locale/es";
import { useHistory } from "react-router-dom";
import { Title } from "../Components";

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
  root: {
    minWidth: 275,
    background: "#5CDB95",
    marginBottom: 20,
    marginRight: 20,
  },
  root2: {
    minWidth: 275,
    background: "#5CDB95",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: "white",
    fontWeight: "500",
  },
}));

const Main = () => {
  const history = useHistory();
  const classes = useStyles();
  const user = useState(JSON.parse(localStorage.getItem('user')));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAdmin(user.admin);// FIXME: admin?
    }
  }, []);

  if (!user.TOKENMAGICO) { // FIXME: token
    return (
      <div
        style={{
          flexDirection: "column",
          display: "flex",
          justifyContent: "space-evenly",
          height: 500,
        }}
      >
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => {
            history.push("/signup");
          }}
        >
          REGISTRARSE
        </Button>

        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={() => {
            history.push("/signin");
          }}
        >
          INGRESAR
        </Button>
      </div>
    );
  }

  return (
    <Container>
        <Title text="Usuario" /> 
        <h3 style={{ marginBottom: 30 }}>{user}</h3>
        <Button
          variant="contained"
          size="large"
          color="primary"
          style={{ width: 300, marginBottom: 20 }}
          onClick={() => {
            history.push("/inventario");
          }}
        >
          Inventario
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          style={{ width: 300, marginBottom: 20 }}
          onClick={() => {
            history.push("/reportes");
          }}
        >
          Reportes
        </Button>
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          style={{ width: 300, marginBottom: 20 }}
          onClick={() => {
            history.push("/editar");
          }}
        >
          Editar usuario
        </Button>
        {isAdmin && (
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="primary"
          style={{ width: 300, marginBottom: 20 }}
          onClick={() => {
            history.push("/admin");
          }}
        >
          Admin
        </Button>
        )}
        <Button
          type="submit"
          variant="contained"
          size="medium"
          className={classes.submit}
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

export default Main;
