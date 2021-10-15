import axios from "axios";

const API = axios.create({
  baseURL: "https://shopkart-server.herokuapp.com/items",
});

const fetchPosts = () => API.get("/");
const addPost = (newPost) => API.post("/", newPost);
const update = (id, post) => API.patch(`/${id}/update`, post);
const delPost = (id) => API.delete(`/${id}/delete`);

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await fetchPosts();
    dispatch({ type: "FETCH_POSTS", payload: data });
  } catch (e) {
    console.log(e);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await addPost(post);
    dispatch({ type: "CREATE_POST", payload: data });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await update(id, post);
    dispatch({ type: "UPDATE_POST", payload: data });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await delPost(id);
    dispatch({ type: "DELETE_POST", payload: id });
  } catch (error) {
    console.log(error);
  }
};
