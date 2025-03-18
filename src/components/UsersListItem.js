import { GoTrashcan } from "react-icons/go";
import Button from "./Button";
import { removeUser } from "../store";
import { useThunk } from "../hooks/use-thunks";


function UsersListItem({ user }) {   //create a UsersListItem component that takes a user prop as an argument and renders the user name and a delete button for each user
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleClick = () => {
        doRemoveUser(user);
    };
    return (
        <div className="mb-2 border rounded">
            <div className="flex p-2 justify-between items-center cursor-pointer">
                <div className="flex flex-row items-center justify-between">
                    <Button className='mr-3' loading={isLoading} onClick={handleClick}>
                        <GoTrashcan className="text-red-500" />
                    </Button>
                    {error && <div className="text-red-500">{error}</div>}
                    {user.name}
                </div>
            </div>
        </div>
    );
}

export default UsersListItem;