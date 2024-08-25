import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import api from "../../services/api";
import toastError from "../../errors/toastError";
import { i18n } from "../../translate/i18n";

const useStyles = makeStyles((theme) => ({
  geralSignup: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url('https://saaswhaticket.online/bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  containerSignup: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logo: {
    width: 150, // Ajuste o tamanho do logo conforme necessário
    marginBottom: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Required"),
  phone: Yup.string().required("Required"),
  planId: Yup.string().required("Required"),
});

const SignUp = () => {
  const classes = useStyles();
  const [user, setUser] = useState({});
  
  // Defina a lista de planos aqui ou obtenha-a de uma API, caso contrário, use valores fictícios
  const plans = [
    { id: "1", name: "Plano 1", users: 1, connections: 1, queues: 1, value: 47.00 },
    { id: "2", name: "Plano 2", users: 5, connections: 5, queues: 5, value: 147.00 },
    { id: "3", name: "Plano 3", users: 10, connections: 10, queues: 10, value: 397.00 },
  ];

  const handleSignUp = async (values) => {
    try {
      const { data } = await api.post("/auth/signup", values);
      console.log(data);
    } catch (err) {
      toastError(err);
    }
  };

  return (
    <div className={classes.geralSignup}>
      <div className={classes.containerSignup}>
        <img
          alt="Logo"
          src="https://saaswhaticket.online/logo.png"
          className={classes.logo}
        />
        <Typography component="h1" variant="h5">
          {i18n.t("signup.title")}
        </Typography>
        <h4 className="h4">Faça um teste GRÁTIS</h4>
        <span className="span">
          Faça seu <b>teste GRATUITO</b> de 3 dias do Whaticket SaaS agora mesmo! <b>.</b>
        </span>
        <Formik
          initialValues={user}
          enableReinitialize={true}
          validationSchema={UserSchema}
          onSubmit={(values, actions) => {
            setTimeout(() => {
              handleSignUp(values);
              actions.setSubmitting(false);
            }, 400);
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <p>Qual o seu nome?</p>
                  <Field
                    as={TextField}
                    margin="dense"
                    autoComplete="name"
                    name="name"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    variant="outlined"
                    fullWidth
                    id="name"
                    label="Seu Nome"
                  />
                </Grid>
                <Grid item xs={12}>
                  <p>Seu número de Whatsapp</p>
                  <Field
                    as={TextField}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    id="phone"
                    label="Telefone com (DDD)"
                    name="phone"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    autoComplete="phone"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <p>Seus dados de acesso</p>
                  <Field
                    as={TextField}
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="email"
                    label={i18n.t("signup.form.email")}
                    name="email"
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    autoComplete="email"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    name="password"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    label={i18n.t("signup.form.password")}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel htmlFor="plan-selection">Plano</InputLabel>
                  <Field
                    as={Select}
                    margin="dense"
                    variant="outlined"
                    fullWidth
                    id="plan-selection"
                    label="Plano"
                    name="planId"
                    required
                  >
                    {plans.map((plan, key) => (
                      <MenuItem key={key} value={plan.id}>
                        {plan.name} - Atendentes: {plan.users} - WhatsApp: {plan.connections} - Filas: {plan.queues} - R${" "}
                        {plan.value}
                      </MenuItem>
                    ))}
                  </Field>
                </Grid>
              </Grid>
              <Button
                type="submit"
                margin="dense"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {i18n.t("signup.buttons.submit")}
              </Button>
              <Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body1"
                    component={RouterLink}
                    to="/login"
                    style={{ color: "#1436EA", fontWeight: 500 }}
                  >
                    {i18n.t("signup.buttons.login")}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;