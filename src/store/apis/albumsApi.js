import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';  //import createApi from the @reduxjs/toolkit/query/react package and fetchBaseQuery from the @reduxjs/toolkit/query/react package
import { faker } from '@faker-js/faker';    //import the faker package to generate fake data for testing


const albumsApi = createApi({   //create an albumsApi using the createApi function
    reducerPath: 'albums', //set the reducerPath to 'albums' reducerpath is the key in the store where the generated reducer will be mounted
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3005' }),  //set the baseQuery option to fetchBaseQuery({ baseUrl: 'http://localhost:3005' }) to configure the base query function to use the specified base URL
    endpoints(builder) {   //add an endpoints option that takes a builder argument
        return {
            addAlbum: builder.mutation({  //add an addAlbum endpoint using the builder.mutation method that takes a function as an argument that returns an object with a query property
                query: (user) => {  //set the query property to a function that takes an album argument
                    return {
                        url: '/albums',  //set the URL path to add an album
                        method: 'POST',  //set the method option to 'POST' to make a POST request
                        body: { 
                            userId: user.id,  //set the body option to an object with a userId property that is set to the user.id argument
                            title: faker.commerce.productName(),  //set the title property to a random product name generated using the faker package
                        }  
                    };
                },
            }),

            fetchAlbums: builder.query({   //add a fetchAlbums endpoint using the builder.query method that takes a function as an argument that returns an object with a query property
                query: (user) => {  //set the query property to a function that takes a user argument
                    return {
                        url: '/albums',  //set the URL path to fetch all albums
                        params: { userId: user.id },  //set the params option to an object with a userId property that is set to the user.id argument
                        method: 'GET',  //set the method option to 'GET' to make a GET request
                    };
                },
            }),
        };
    },
});

export const { 
    useFetchAlbumsQuery ,
    useAddAlbumMutation
} = albumsApi;  //export the useFetchAlbumsQuery hook from the albumsApi and the useAddAlbumMutation hook from the albumsApi
export { albumsApi };  //export the albumsApi

