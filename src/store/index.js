import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';  // import the setupListeners function from the @reduxjs/toolkit/query package to set up the cache invalidation and refetching logic
import { usersReducer } from './slices/usersSlice';
import { albumsApi } from './apis/albumsApi';

export const store = configureStore({
    reducer: {
        users: usersReducer,   //add the usersReducer to the store using the users key
        [albumsApi.reducerPath]: albumsApi.reducer,   //add the albumsApi reducer to the store using the reducerPath key
    },

    middleware: (getDefaultMiddleware) => { //add a middleware option that takes a getDefaultMiddleware function as an argument
        return getDefaultMiddleware().concat(albumsApi.middleware);  //add the albumsApi.middleware to the default middleware
    }
});


setupListeners(store.dispatch);  //call the setupListeners function with the store.dispatch function to set up the cache invalidation and refetching logic

export * from './thunks/fetchUsers';  // export all thunks from fetchUsers.js
export * from './thunks/addUser';  // export all thunks from addUser.js
export * from './thunks/removeUser';  // export all thunks from removeUser.js
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from './apis/albumsApi';  //export the useFetchAlbumsQuery hook from the albumsApi, the useAddAlbumMutation hook from the albumsApi, and the useRemoveAlbumMutation hook from the albumsApi
