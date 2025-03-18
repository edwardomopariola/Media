import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const removeUser = createAsyncThunk('users/remove', async (user) => {  //create a new thunk called removeUser that makes a DELETE request to the /users/:id endpoint of the API
    await axios.delete(`http://localhost:3005/users/${user.id}`);

    return user;   //return the user object as the payload of the action to be used in the reducer case
});


export { removeUser };