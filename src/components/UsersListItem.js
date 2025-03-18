import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import { useThunk } from "../hooks/use-thunks";
import ExpandablePanel from "./ExpandablePanel";    
import AlbumsList from "./AlbumsList";


function UsersListItem({ user }) {   //create a UsersListItem component that takes a user prop as an argument and renders the user name and a delete button for each user
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);   //use the useThunk hook to create a doRemoveUser function that dispatches the removeUser thunk and manages the loading state and error state

    const handleClick = () => {
        doRemoveUser(user);
    };

    const header = <>
        <Button className='mr-3' loading={isLoading} onClick={handleClick}>
                        <GoTrashcan className="text-red-500" />
        </Button>
        {error && <div className="text-red-500">{error}</div>}
        {user.name}
    </>;

    return  <ExpandablePanel header={header}> <AlbumsList user={user}/> </ExpandablePanel>
            
    

}

export default UsersListItem;