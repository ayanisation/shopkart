import { CircularProgress, Container, Grid, Grow, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../Actions/itemsAction";
import Item from "./Item";
import Navbar from "./Navbar";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    alignItems: "center",
    padding: 40,
    marginTop: 25,
  },
}));

export default function Homepage() {
  const classes = useStyles();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  let items = useSelector((state) => state.items);

  console.log(items);

  return (
    <>
      <Navbar />
      <Grow in>
        <Container maxWidth="lg" style={{ marginTop: "40px" }}>
          <Paper style={{ boxShadow: "10px" }}>
            {!items.length ? (
              <Container
                maxWidth="sm"
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: 100,
                }}
              >
                <CircularProgress />
              </Container>
            ) : (
              <Grid
                className={classes.mainContainer}
                container
                alignItems="stretch"
                spacing={3}
              >
                {items.map((item) => (
                  <Grid key={item._id} item xs={12} sm={6}>
                    <Item item={item} parent="homepage" />
                  </Grid>
                ))}
              </Grid>
            )}
          </Paper>
        </Container>
      </Grow>
    </>
  );
}
