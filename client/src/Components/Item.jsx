import { Card, CardMedia, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { deletePost } from "../Actions/itemsAction";

const useStyles = makeStyles({
  media: {
    height: 0,
    paddingTop: "66.25%",
    backgroundColor: "white",
    // backgroundBlendMode: "darken",
  },
  card: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    height: "100%",
    position: "relative",
  },
  overlay2: {
    alignSelf: "flex-end",
    position: "absolute",
  },
  image: {
    margin: "0px auto",
    maxHeight: "40vh",
    maxWidth: "100vw",
  },
});

export default function Item({ item, parent }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const deleteIt = () => {
    if (window.confirm("Are you sure you wish to delete this item?"))
      dispatch(deletePost(item._id));
  };

  return (
    <>
      <Card
        className={classes.card}
        component={parent === "homepage" && Link}
        to={`/item/${item?._id}`}
      >
        <div className={classes.overlay2}>
          {user && user.userType === "Admin" && (
            <>
              <IconButton
                style={{ color: "black" }}
                component={Link}
                to={`/populate/${item?._id}`}
                title="Edit Post"
              >
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton style={{ color: "black" }} onClick={deleteIt}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </div>
        <img className={classes.image} src={item?.image} alt="Broken" />
        <Typography
          variant="h6"
          style={{
            margin: "0 auto",
          }}
        >
          {item?.name}
        </Typography>
        <Typography
          variant="h6"
          style={{
            fontWeight: "bold",
            margin: "0 auto",
          }}
        >
          Rs.{item?.price}
        </Typography>
        {parent === "details" && (
          <Typography
            variant="h7"
            style={{
              margin: "0 auto 10px auto",
            }}
          >
            {item?.details}
          </Typography>
        )}
      </Card>
    </>
  );
}
