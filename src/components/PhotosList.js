import { useFetchPhotosQuery, useAddPhotoMutation } from "../store";
import Button from "./Button";
import Skeleton from "./Skeleton";
import PhotosListItem from "./PhotosListItem";

function PhotosList({ album}) {
    const {data, isFetching, error} = useFetchPhotosQuery(album);  //use the useFetchPhotosQuery hook to fetch the photos for the album 
    const [addPhoto, addPhotoResults] = useAddPhotoMutation();   //use the useAddPhotoMutation hook to add a photo for the album

    const handleAddPhoto = () => {   //create a handleAddPhoto function that calls the addPhoto function with the album as an argument
        addPhoto(album);
    };  //render a Button component with the text '+ Add Photo' that calls the handleAddPhoto function when clicked

    let content;  //create a content variable to store the content to be rendered
    if (isFetching) {   //isFetching is a boolean value that indicates whether the query is currently fetching data from the server
        content = <Skeleton className="h-8 w-8" times={4} />;   //if loading, render a Skeleton component with 4 items
    } else if (error) {   //check if there is an error
        content = <div>Error loading photos</div>;
    } else {   //if there is no error and the data is loaded successfully 
        content = data.map(photo => {   //map over the data to render each photo as a PhotosListItem component
            return <PhotosListItem key={photo.id} photo={photo} />;
        });
    }

    return <div>
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">Photos in {album.title}</h3>
            <Button loading={addPhotoResults.isLoading} onClick={handleAddPhoto}>
                + Add Photo
            </Button>
        </div>
        <div className="mx-8 flex flex-ro flex-wrap justify-center">{content}</div>
    </div>;
}

export default PhotosList;