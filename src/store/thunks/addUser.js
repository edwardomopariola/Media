import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { faker } from '@faker-js/faker';

//create a new thunk called addUser that makes a POST request to the /users endpoint of the API
//and returns the response data as the payload of the action
const addUser  = createAsyncThunk('users/add', async () => {
    const response = await axios.post('http://localhost:3005/users', {
        name: faker.name.fullName()
       
    });
    console.log("API response:", response.data); //log the response data to the console
    return response.data;
});

export { addUser };