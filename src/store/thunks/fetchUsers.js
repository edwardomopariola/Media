import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//create a new thunk called fetchUsers that makes a GET request to the /users endpoint of the API
//and returns the response data as the payload of the action
//createAsyncThunk function takes two arguments: a string that represents the name of the thunk action type,
//and an async callback function that performs the asynchronous operation
const fetchUsers = createAsyncThunk('users/fetch', async () => {  
    //use the axios library to make a GET request to the /users endpoint of the API
    const response = await axios.get('http://localhost:3005/users');

    // DEV ONLY!!!
    await pause (1000); //set a delay of 1 second to simulate a slow network connection


    return response.data;
});

// DEV ONLY!!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}

export { fetchUsers };