import React, { useState, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { i18n } from "../../translate/i18n";
import "./style.css";
import { AuthContext } from "../../context/Auth/AuthContext";
import logo from "../../assets/logo.png";

const Copyright = () => {
  return (
    <Typography variant="body2" color="primary" align="center">
      {"Copyright "}
      <Link color="primary" href="#">
        Pack Typebot
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(to right, #0000FF , #0000CD , #00008B)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },

  paper: {
    backgroundColor: theme.palette.login, //DARK MODE PACK TYPEBOT//
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "55px 30px",
    borderRadius: "12.5px"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "80%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submit: {
    "&.MuiButton-root": {
      margin: "20px 0px 16px",
      backgroundColor: "rgb(20, 54, 234)",
      borderRadius: " 30px"
    },
    "&:hover": {
      backgroundColor: "#285ec9"
      // boxShadow: "none",
    },

    backgroundColor: "rgb(20, 54, 234)",
    margin: theme.spacing(3, 0, 2),
    WebkitTextFillColor: "#FFF",
    width: "50%"
  },
  powered: {
    color: "white"
  },
  input: {
    "& .MuiOutlinedInput-root": {
      position: "relative",
      borderRadius: "30px"
    }
  }
}));

const Login = () => {
  const classes = useStyles();

  const [user, setUser] = useState({ email: "", password: "" });

  const { handleLogin } = useContext(AuthContext);

  const handleChangeInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlSubmit = e => {
    e.preventDefault();
    handleLogin(user);
  };

  return (
    <div className="geral">
      <CssBaseline />
      <div className={"container-login"}>
        <div className={"container-img"}>
          <img
            alt={"Logo"}
            src={
              "https://i.ibb.co/c8dB6gM/logo-1.webp"
            }
            className="img-login"
          ></img>
        </div>
        <div className="container-footer">
          
        </div>
      </div>
      <div className={"container-right"}>
        <div className={"box"}>
          <div className={"container-header-box"}>
            <Link
              // variant="body2"
              component={RouterLink}
              className={"link-create-count"}
              tabIndex={0}
              role={"button"}
              aria-disabled={"false"}
              to="/signup"
              style={{ textDecoration: "none" }}
            >
              <span className={"label-text"}>Criar conta</span>
            </Link>
            <a
              className={"link-enter"}
              tabIndex={0}
              role={"button"}
              aria-disabled={"false"}
              to="/login"
              style={{ textDecoration: "none" }}
            >
              <span>Entrar</span>
            </a>
          </div>
          <form className={classes.form} noValidate onSubmit={handlSubmit}>
            <TextField
              className={classes.input}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              id="email"
              label={i18n.t("login.form.email")}
              name="email"
              value={user.email}
              onChange={handleChangeInput}
              autoComplete="email"
              autoFocus
              inputProps={{
                style: {
                  borderRadius: "50px",
                  height: "30px",
                  padding: "12px",
                  backgroundColor: "#E8F0FE"
                }
              }}
            />
            <TextField
              className={classes.input}
              variant="outlined"
              margin="dense"
              required
              fullWidth
              name="password"
              label={i18n.t("login.form.password")}
              type="password"
              id="password"
              value={user.password}
              onChange={handleChangeInput}
              autoComplete="current-password"
              inputProps={{
                style: {
                  borderRadius: "50px",
                  height: "30px",
                  padding: "12px",
                  backgroundColor: "#E8F0FE"
                }
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {i18n.t("login.buttons.submit")}
            </Button>
          </form>
          <div className={"container-footer-form"}>
            <p>
              Ao prosseguir, você concorda com nossos{" "}
              <a className={"termo"} href={"/term"} target={"_blank"}>
                Termos de Serviço{""}
              </a>{" "}
              e{" "}
              <a className={"politica"} href={"/privacy"} target={"_blank"}>
                Política de Privacidade
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
