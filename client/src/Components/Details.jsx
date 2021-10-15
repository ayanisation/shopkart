import { AppBar, Container, Grow, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getPosts } from "../Actions/itemsAction";
import Item from "./Item";

const useStyles = makeStyles((theme) => ({
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
}));

export default function Details() {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const item = useSelector((state) =>
    id ? state.items.find((item) => item._id === id) : null
  );

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
        <Container maxWidth="lg" style={{ marginTop: 40 }}>
          <Item item={item} parent="details" />
        </Container>
      </Grow>
    </>
  );
}
