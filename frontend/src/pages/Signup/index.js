import React, { useState, useEffect } from "react";
import qs from "query-string";

import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import usePlans from "../../hooks/usePlans";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "../../assets/logo.png";
import backgroundStep from "../../assets/backgroundStep.png";
import { i18n } from "../../translate/i18n";
import "./style.css";
import { openApi } from "../../services/api";
import toastError from "../../errors/toastError";
import moment from "moment";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Pack Typebot
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
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
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: "20px 0px 16px",
    backgroundColor: "rgb(20, 54, 234)",
    borderRadius: "30px",
    color: "#FFF",
    "&:hover": {
      backgroundColor: "#285ec9",
      boxShadow: "none",
    },
  },
}));

const UserSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  password: Yup.string().min(5, "Too Short!").max(50, "Too Long!"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  let companyId = null;

  const params = qs.parse(window.location.search);
  if (params.companyId !== undefined) {
    companyId = params.companyId;
  }

  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    planId: "",
  };

  const [user] = useState(initialState);
  const dueDate = moment().add(3, "day").format();
  const handleSignUp = async (values) => {
    Object.assign(values, { recurrence: "MENSAL" });
    Object.assign(values, { dueDate: dueDate });
    Object.assign(values, { status: "t" });
    Object.assign(values, { campaignsEnabled: true });
    try {
      await openApi.post("/companies/cadastro", values);
      toast.success(i18n.t("signup.toasts.success"));
      history.push("/login");
    } catch (err) {
      console.log(err);
      toastError(err);
    }
  };

  const [plans, setPlans] = useState([]);
  const { list: listPlans } = usePlans();

  useEffect(() => {
    async function fetchData() {
      const list = await listPlans();
      setPlans(list);
    }
    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.containerSignup}>
        <img
          alt={"Logo"}
          src={"https://saaswhaticket.online/logo.png"}
          className={classes.logo}
        ></img>
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
        <span>
          Faça um <b>teste GRATUITO</b> de 3 dias no SaaS Whaticket Sac Online
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
        <Box mt={5}>{/* <Copyright /> */}</Box>
      </div>
    </div>
  );
};

export default SignUp;