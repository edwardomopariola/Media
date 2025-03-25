import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';  //import createApi from the @reduxjs/toolkit/query package
import { faker } from '@faker-js/faker';

const photosApi = createApi({  //create a photosApi using the createApi function
    reducerPath: 'photos',  //set the reducerPath to 'photos' to mount the generated reducer in the store
    baseQuery: fetchBaseQuery({  //set the baseQuery option to fetchBaseQuery({ baseUrl: 'http://localhost:3005' }) to configure the base query function to use the specified base URL
        baseUrl: 'http://localhost:3005',
    }),
    endpoints(builder) {  //add an endpoints option that takes a builder argument
        return {  //return an object with the fetchPhotos endpoint
            fetchPhotos: builder.query({  //add a fetchPhotos endpoint using the builder.query method that takes a function as an argument that returns an object with a query property
                providesTags: (result, error, album) => {
                    const tags = result.map((photo) => {
                        return { type: 'photo', id: photo.id };  //set the providesTags option to ['photo'] to provide a result, arg, and select state for the endpoint
                    });
                    tags.push({ type: 'AlbumPhoto', id: album.id });  //push an object with a type of 'AlbumPhoto' and an id of album.id to the tags array and return the tags array
                    return tags;
                },
                query: (album) => {  //set the query property to a function that returns the URL path to fetch all photos
                    return {
                        url: '/photos',
                        params: {
                            albumId: album.id,  //set the params option to an object with an albumId property that is set to the album.id argument
                        },
                        method: 'GET',
                    };
                },
            }),
            addPhoto: builder.mutation({  //add an addPhoto endpoint using the builder.mutation method that takes a function as an argument that returns an object with a query property
                invalidatesTags: (result, error, album) => {  //set the invalidatesTags option to a function that takes a result, error, and album argument
                    return [{ type: 'AlbumPhoto', id: album.id }];  //return an array with an object that has a type of 'AlbumPhoto' and an id of album.id to invalidate the result, arg, and select state for the endpoint
                },
                query: (album) => {  //set the query property to a function that takes a photo argument
                    return {
                        url: '/photos',  //set the URL path to add a photo
                        method: 'POST',  //set the method option to 'POST' to make a POST request
                        body: {
                            albumId: album.id,  //set the body option to an object with an albumId property that is set to the album.id argument
                            // url: faker.image.imageUrl(150, 150, true)  //set the url property to a random abstract image URL generated using the faker package
                            url: 'https://picsum.photos/150/150?random=1'

                        },
                    };
                },
            }),
            removePhoto: builder.mutation({  //add a removePhoto endpoint using the builder.mutation method that takes a function as an argument that returns an object with a query property
                invalidatesTags: (result, error, photo) => {  //set the invalidatesTags option to a function that takes a result, error, and photo argument
                    return [{ type: 'photo', id: photo.id }];  //return an array with an object that has a type of 'photo' and an id of photo.id to invalidate the result, arg, and select state for the endpoint
                },
                query: (photo) => {  //set the query property to a function that takes a photo argument
                    return {
                        url: `/photos/${photo.id}`,  //set the URL path to remove a photo with the specified photo.id
                        method: 'DELETE',  //set the method option to 'DELETE' to make a DELETE request
                    };
                },
            }),
        };
    },
});

export const { useFetchPhotosQuery, useAddPhotoMutation, useRemovePhotoMutation } = photosApi;  //export the useFetchPhotosQuery, useAddPhotoMutation, and useRemovePhotoMutation hooks from the photosApi
export { photosApi };  //export the photosApi