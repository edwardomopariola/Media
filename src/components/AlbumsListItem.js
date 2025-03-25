import { GoTrashcan } from "react-icons/go";
import { useRemoveAlbumMutation } from "../store";
import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import PhotosList from "./PhotosList";

function AlbumsList({ album }) {
    const [removeAlbum, results] = useRemoveAlbumMutation();

    const handleRemoveAlbum = () => {
        removeAlbum(album);
    };

    const header = (   //create a header element with a delete button and the album title)
        <>
            <Button 
                className='mr-2'
                loading={results.isLoading} onClick={handleRemoveAlbum}>
                <GoTrashcan className="text-red-500" />
            </Button>
            {album.title}
        </>
    );
    
    return (  //render an ExpandablePanel component with the album title as the header and a list of photos in the album as the content
        <ExpandablePanel key={album.id} header={header}>
            <PhotosList album={album} /> 
        </ExpandablePanel>
    );
}

export default AlbumsList;