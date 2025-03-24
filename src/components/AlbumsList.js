import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";

function AlbumsList({ user }) {   //create an AlbumsList component that takes a user prop as an argument and renders a list of albums for the user
    const { data, error, isLoading } = useFetchAlbumsQuery(user);   //use the useFetchAlbumsQuery hook to fetch the albums for the user
    const [addAlbum, results] = useAddAlbumMutation();   //use the useAddAlbumMutation hook to add an album for the user

    const handleAddAlbum = () => {   //create a handleAddAlbum function that calls the addAlbum function with the user as an argument
        addAlbum(user);
    };

    let content;  //create a content variable to store the content to be rendered
    if (isLoading) {   //check if the data is loading
        content = <Skeleton times={4} />;   //if loading, render a Skeleton component with 4 items
    } else if (error) {   //check if there is an error
        content = <div>Error loading albulms</div>;
    }else {   //if there is no error and the data is loaded successfully 
        content = data.map(album => {   //map over the data to render each album as an ExpandablePanel component with the album title as the header
            const header = <div>{album.title}</div>

            return <ExpandablePanel key={album.id} header={header}>
                List of photos in the album
            </ExpandablePanel>
        });
    }

    // render the user name and the content
    return (
        <div>
            <div>
                Albums for {user.name}
                <Button onClick={() => addAlbum(user)}>+ Add Album</Button>
            </div>
            <div>{content}</div>
        </div>
    );
}

export default AlbumsList;