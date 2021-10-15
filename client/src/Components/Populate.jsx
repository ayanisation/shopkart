import {
  AppBar,
  Button,
  Container,
  Grow,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import FileBase from "react-file-base64";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { createPost, updatePost } from "../Actions/itemsAction";

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
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    padding: "5%",
    justifyContent: "center",
  },
  textField: {
    marginTop: 6,
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
    background: "#79CDCD",
    fontFamily: "Copperplate Papyrus",
  },
  buttonClear: {
    fontWeight: "bold",
    fontFamily: "Copperplate Papyrus",
    color: "#ffffff",
    marginTop: 10,
    marginBottom: 10,
    background: "grey",
  },
  buttonCancel: {
    fontWeight: "bold",
    fontFamily: "Copperplate Papyrus",
    color: "#ffffff",
    marginTop: 10,
    marginBottom: 10,
    background: "#ed1c24",
  },
}));

export default function Populate() {
  const classes = useStyles();

  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [img, setImg] = useState(
    "https://img.icons8.com/pastel-glyph/64/000000/image-file-add.png"
  );

  const item = useSelector((state) =>
    id ? state.items.find((item) => item._id === id) : null
  );
  const [postData, setPostData] = useState({
    name: "",
    price: "",
    image: "",
    details: "",
  });

  useEffect(() => {
    if (item) {
      setPostData(item);
      setImg(item?.image);
    }
  }, [item]);

  const user = JSON.parse(localStorage.getItem("profile"));
  if (!user || user.userType === "User") history.push("/");
  const [clicked, setClicked] = useState(false);

  const updateData = (e) => {
    setPostData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const clearForm = () => {
    if (!window.confirm("Are you sure you want to clear data?")) return;
    setPostData({
      name: "",
      price: "",
      image: "",
      details: "",
    });
    setImg("https://img.icons8.com/pastel-glyph/64/000000/image-file-add.png");
  };

  const populate = async (e) => {
    e.preventDefault();
    console.log(postData);
    if (postData.name === "") alert("Please enter name of the product");
    else if (postData.price === "") alert("Please set a price for the product");
    else if (postData.image === "") alert("Please upload an image");
    else {
      setClicked(true);
      let uploaded;
      if (id) uploaded = await dispatch(updatePost(id, postData));
      else uploaded = await dispatch(createPost(postData));
      if (uploaded) history.push("/");
      else alert("Upload Failed!");
      setClicked(false);
    }
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
        <Container maxWidth="sm" style={{ marginTop: 60, marginBottom: 60 }}>
          <Paper className={classes.paper}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                style={{ maxHeight: "30vh", maxWidth: "50vw" }}
                src={img}
                alt="Oops!"
              />
            </div>
            <form autoComplete="off" noValidate className={classes.form}>
              <TextField
                className={classes.textField}
                name="name"
                variant="outlined"
                label="Title"
                fullWidth
                value={postData.name}
                onChange={updateData}
              ></TextField>
              <TextField
                className={classes.textField}
                name="price"
                type="number"
                variant="outlined"
                label="Price"
                fullWidth
                value={postData.price}
                onChange={updateData}
              ></TextField>
              <TextField
                className={classes.textField}
                name="details"
                variant="outlined"
                multiline
                maxRows={4}
                label="Details"
                fullWidth
                value={postData.details}
                onChange={updateData}
              ></TextField>
              <div className={classes.fileInput}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => {
                    setImg(base64);
                    setPostData({ ...postData, image: base64 });
                  }}
                ></FileBase>
              </div>
              <Button
                className={classes.buttonSubmit}
                variant="contained"
                size="large"
                type="submit"
                fullWidth
                onClick={populate}
              >
                Upload
              </Button>
              <Button
                className={classes.buttonClear}
                variant="contained"
                size="small"
                fullWidth
                onClick={clearForm}
              >
                clear
              </Button>
              <Button
                className={classes.buttonCancel}
                variant="contained"
                size="small"
                fullWidth
                onClick={() => {
                  history.push("/feed");
                }}
              >
                Cancel
              </Button>
            </form>
            {clicked ? <LinearProgress /> : <></>}
          </Paper>
        </Container>
      </Grow>
    </>
  );
}
