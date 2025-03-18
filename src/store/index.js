import { configureStore } from '@reduxjs/toolkit';
import { usersReducer } from './slices/usersSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
    }
});

export * from './thunks/fetchUsers';  // export all thunks from fetchUsers.js
export * from './thunks/addUser';  // export all thunks from addUser.js
export * from './thunks/removeUser';  // export all thunks from removeUser.js
