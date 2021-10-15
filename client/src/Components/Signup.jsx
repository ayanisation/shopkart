import {
  AppBar,
  Button,
  Container,
  Fade,
  Grow,
  IconButton,
  InputAdornment,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useForm } from "react-hook-form";
import Forms from "../Jsons/Forms";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useDispatch } from "react-redux";
import { signup } from "../Actions/usersAction";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: "5%",
    },
  },
  appBar: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0080ff",
  },
  heading: {
    color: "white",
  },
  paper: {
    padding: "5%",
    background: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  textField: {
    marginBottom: 8,
  },
  buttonSubmit: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    background: "#79CDCD",
    fontFamily: "Copperplate Papyrus",
  },
  buttonCancel: {
    fontWeight: "bold",
    fontFamily: "Copperplate Papyrus",
    marginTop: 10,
    marginBottom: 10,
    background: "#ed1c24",
    color: "white",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
  },
}));

let schema = yup.object().shape({
  name: yup.string().required("Please enter your name"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Please enter your email"),
  password: yup
    .string()
    .required("Please create a password ")
    .min(8, "Password should be atleast 8 digits long"),
  confPass: yup
    .string()
    .required("Please confirm password ")
    .min(8, "Password should be atleast 8 digits long"),
});

export default function Signup() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [issue, setIssue] = useState(false);
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (formData) => {
    if (formData.password !== formData.confPass) {
      window.alert("Passwords do not match");
      return;
    }
    formData.userType = "User";
    console.log(formData);
    setLoad(true);
    try {
      const response = await dispatch(signup(formData));
      if (response !== "Success") {
        setLoad(false);
        setMessage("Email is taken, try another");
        setIssue(true);
        setTimeout(() => {
          setIssue(false);
        }, 3000);
      } else {
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      setLoad(false);
      setMessage("Unable to register (Internal server error)");
      setIssue(true);
      setTimeout(() => {
        setIssue(false);
      }, 3000);
    }
    setLoad(false);
  };
  return (
    <>
      <Container maxWidth="lg" style={{ height: 30 }}>
        <AppBar className={classes.appBar} position="fixed" color="inherit">
          <Typography className={classes.heading} variant="h4" align="center">
            ShopKart
          </Typography>
        </AppBar>
      </Container>
      <Grow in>
        <Container maxWidth="sm" style={{ marginTop: 20, marginBottom: 60 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
              padding: 20,
            }}
          >
            <Fade in={issue}>
              <Paper style={{ padding: 10, background: "#ba160c" }}>
                <Typography style={{ color: "white" }} variant="h6">
                  {message}
                </Typography>
              </Paper>
            </Fade>
          </div>
          <Paper className={classes.paper}>
            <form autoComplete="off" className={classes.form} noValidate>
              <Typography
                style={{ textAlign: "center", marginBottom: 20 }}
                variant="h4"
              >
                Create an account
              </Typography>
              {Forms.map((form) => (
                <div key={form.name} className={classes.textField}>
                  <TextField
                    {...register(form.name)}
                    name={form.name}
                    type={
                      form.name === "password"
                        ? visible
                          ? "text"
                          : "password"
                        : form.type
                    }
                    variant="outlined"
                    label={form.label}
                    fullWidth
                    InputProps={{
                      endAdornment:
                        form.name === "password" ? (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                setVisible((preVisible) => !preVisible);
                              }}
                            >
                              {visible ? (
                                <VisibilityIcon />
                              ) : (
                                <VisibilityOffIcon />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ) : (
                          <></>
                        ),
                    }}
                  ></TextField>
                  {errors[form.name] ? (
                    <p style={{ color: "#b22222", marginTop: -3 }}>
                      {errors[form.name].message}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
              <div className={classes.buttons}>
                <Button
                  className={classes.buttonSubmit}
                  onClick={handleSubmit(submit)}
                >
                  Submit
                </Button>
                <Button
                  onClick={() => {
                    history.push("/");
                  }}
                  className={classes.buttonCancel}
                >
                  Cancel
                </Button>
              </div>
              {load && <LinearProgress />}
            </form>
          </Paper>
        </Container>
      </Grow>
    </>
  );
}
