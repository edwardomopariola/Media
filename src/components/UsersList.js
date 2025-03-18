import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import Button from "./Button";
import  Skeleton  from "./Skeleton";
import { useThunk } from "../hooks/use-thunks";
import  UsersListItem  from "./UsersListItem";


function UsersList() {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = 
        useThunk(fetchUsers);  //use the useThunk hook to create a doFetchUsers function that dispatches the fetchUsers thunk and manages the loading state of the users
    const [doCreatingUser, isCreatingUser, creatingUserError] =
        useThunk(addUser);  //use the useThunk hook to create a doCreatingUser function that dispatches the addUser thunk and manages the loading state of the users

    const { data } = useSelector((state) => {  //use the useSelector hook to get the isLoading, data, and error state from the Redux store}
        return state.users;  //use the useSelector hook to get the users state from the Redux store
    });

    // useEffect is a library hook that allows you to run side effects in function components
    useEffect(() => {   //useEffect hook to dispatch the fetchUsers thunk when the component mounts
       doFetchUsers();
    }, [ doFetchUsers ]);

    const handleUserAdd = () => {
        doCreatingUser();  //call the doCreatingUser function to dispatch the addUser thunk when the Add User button is clicked
    }

    let content;   //create a content variable to store the JSX content to be rendered
    if (isLoadingUsers) {  //check if the isLoadingUsers state is true to display a loading spinner while the data is being fetched
        content = <Skeleton times={6} className='h-10 w-full' />;
    } else if (loadingUsersError) {  //check if the loadingUsersError state is true to display an error message if the data fetching fails
        content = <div>Error fetching data...</div>
    } else {   //if the data fetching is successful, map over the data array and render a UsersListItem component for each user
        content = data.map((user) => {
            return <UsersListItem key={user.id} user={user} />;
        });

    }
    return <div>
        <div className="flex justify-row justify-between items-center m-3">
            <h1 className="m-2 text-xl">Users</h1>
            <Button loading={isCreatingUser} onClick={handleUserAdd}>  
                + Add User
            </Button>
            {creatingUserError && 'Error creating user...'}
        </div>
        {content}
    </div>;
}

export default UsersList;