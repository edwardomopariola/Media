import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import AlbumsListItem from './AlbumsListItem';

function AlbumsList({ user }) {   //create an AlbumsList component that takes a user prop as an argument and renders a list of albums for the user
    const { data, error, isLoading } =  useFetchAlbumsQuery(user);  //use the useFetchAlbumsQuery hook to fetch the albums for the user
    const [addAlbum, results] = useAddAlbumMutation();   //use the useAddAlbumMutation hook to add an album for the user

    const handleAddAlbum = () => {   //create a handleAddAlbum function that calls the addAlbum function with the user as an argument
        addAlbum(user);
    };

    let content;  //create a content variable to store the content to be rendered
    if (isLoading) {   //check if the data is loading
        content = <Skeleton className="h-10 w-full" times={4} />;   //if loading, render a Skeleton component with 4 items
    } else if (error) {   //check if there is an error
        content = <div>Error loading albulms</div>;
    }else {   //if there is no error and the data is loaded successfully 
        content = data.map(album => {   //map over the data to render each album as an ExpandablePanel component with the album title as the header
          return <AlbumsListItem key={album.id} album={album} />;
        });
    }

    // render the user name and the content
    return (
        <div>
            <div className="m-2 flex flex-row items-center justify-between">
                <h3 className="text-lg font-bold">Albums for {user.name}</h3>
                <Button loading={results.isLoading} onClick={handleAddAlbum}>+ Add Album</Button>
            </div>
            <div>{content}</div>
        </div>
    );
}

export default AlbumsList;