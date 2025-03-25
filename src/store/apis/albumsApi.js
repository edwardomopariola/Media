import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';  //import createApi from the @reduxjs/toolkit/query/react package and fetchBaseQuery from the @reduxjs/toolkit/query/react package
import { faker } from '@faker-js/faker';    //import the faker package to generate fake data for testing

// DEV ONLY!!!
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    })
}


const albumsApi = createApi({   //create an albumsApi using the createApi function
    reducerPath: 'albums', //set the reducerPath to 'albums' reducerpath is the key in the store where the generated reducer will be mounted
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'http://localhost:3005',  //set the baseQuery option to fetchBaseQuery({ baseUrl: 'http://localhost:3005' }) to configure the base query function to use the specified base URL
        //REMOVE FOR PRODUCTION
        fetchFn: async (...args) => {  //set the fetchFn option to an async function that takes the arguments and returns the fetch function with the arguments
            await pause (1000);
            return fetch(...args);  
        }
    }),
    endpoints(builder) {   //add an endpoints option that takes a builder argument
        return {
            removeAlbum: builder.mutation({  //add a removeAlbum endpoint using the builder.mutation method that takes a function as an argument that returns an object with a query property
                invalidatesTags: (result, error, album) => {  //set the invalidatesTags option to a function that takes a result, error, and album argument
                    return [{ type: 'Album', id: album.Id }];  //return an array with an object that has a type of 'Album' and an id of album.id to invalidate the result, arg, and select state for the endpoint
                },
                query: (album) => {   //set the query property to a function that takes an album argument and return an object with a URL path and method
                    return {
                        url: `/albums/${album.id}`,  //set the URL path to remove an album with the specified album.id
                        method: 'DELETE',  //set the method option to 'DELETE' to make a DELETE request
                    };
                },
            }),
            addAlbum: builder.mutation({  //add an addAlbum endpoint using the builder.mutation method that takes a function as an argument that returns an object with a query property'
                invalidatesTags: (resuilt, error, user) => {
                    return [{ type: 'UsersAlbum', id: user.id }];  //set the invalidatesTags option to ['Album'] to invalidate the result, arg, and select state for the endpoint
                },
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
                providesTags: (result, error, user) => {
                    const tags = result.map(album => {
                        return { type: 'Album', id: album.id };  //set the providesTags option to ['Album'] to provide a result, arg, and select state for the endpoint
                    });
                    tags.push({ type: 'UsersAlbums', id: user.id });  //push an object with a type of 'UsersAlbums' and an id of user.id to the tags array and return the tags array
                    return tags;
                }, 
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
    useAddAlbumMutation,
    useRemoveAlbumMutation,
} = albumsApi;  //export the useFetchAlbumsQuery hook from the albumsApi and the useAddAlbumMutation hook from the albumsApi
export { albumsApi };  //export the albumsAp