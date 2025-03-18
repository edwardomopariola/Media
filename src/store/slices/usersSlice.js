import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../thunks/fetchUsers";
import { addUser } from "../thunks/addUser";  //import the fetchUsers thunk from the thunks/fetchUsers.js file
import { removeUser } from "../thunks/removeUser";  //import the fetchUsers thunk from the thunks/fetchUsers.js file

const usersSlice = createSlice({
    name: "users",
    initialState: {
        data: [],
        isLoading: false,
        error: null
    },
    //add an extraReducers field to the object passed to the createSlice function that takes a callback function 
    // as an argument to handle the pending, fulfilled, and rejected cases for the fetchUsers thunk
    extraReducers(builder) {
        builder.addCase(fetchUsers.pending, (state, action) => {   //add a pending case for the fetchUsers thunk to set the isLoading state to true while the request is in progress 
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {  //add a fulfilled case for the fetchUsers thunk to set the data state to the response data and set the isLoading state to false
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {  //add a rejected case for the fetchUsers thunk to set the error state and isLoading state to false if the request fails
            state.error = action.error;
            state.isLoading = false;
        });

        builder.addCase(addUser.pending, (state, action) => {   //add a pending case for the addUser thunk to set the isLoading state to true while the request is in progress
            state.isLoading = true;
        });

        builder.addCase(addUser.fulfilled, (state, action) => {   //add a fulfilled case for the addUser thunk to add the new user to the data array and set the isLoading state to false
            state.data.push(action.payload);
            state.isLoading = false;
        });

        builder.addCase(addUser.rejected, (state, action) => {   //add a rejected case for the addUser thunk to set the error state and isLoading state to false if the request fails
            state.error = action.error;
            state.isLoading = false;
        });

        builder.addCase(removeUser.pending, (state, action) => {   //add a pending case for the removeUser thunk to set the isLoading state to true while the request is in progress
            state.isLoading = true;
        });

        builder.addCase(removeUser.fulfilled, (state, action) => {   //add a fulfilled case for the removeUser thunk to remove the user from the data array and set the isLoading state to false
            state.data = state.data.filter(user => {   //use the filter method to remove the user from the data array where the user id matches the id of the user passed in the action payload
                return user.id !== action.payload.id;
            });
            state.isLoading = false;
        });

        builder.addCase(removeUser.rejected, (state, action) => {   //add a rejected case for the removeUser thunk to set the error state and isLoading state to false if the request fails
            state.error = action.error;
            state.isLoading = false;
        });
    }

});

export const usersReducer = usersSlice.reducer;