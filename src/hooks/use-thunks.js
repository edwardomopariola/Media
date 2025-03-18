import { useState, useCallback} from "react";
import { useDispatch } from "react-redux";

//use the useThunk hook to create a custom hook that manages the loading state and error state of a thunk
export function useThunk(thunk) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    
    const runThunk = useCallback(  //use the useCallback hook to memoize the runThunk function
        (arg) => {   //create a runThunk function that takes an argument and dispatches the thunk action creator
            setIsLoading(true);
            dispatch(thunk(arg))  //dispatch the thunk action creator and pass the argument to the thunk
                .unwrap()
                .catch((error) => setError(error))
                .finally(() => setIsLoading(false));
        },
        [dispatch, thunk]
    );

    return [ runThunk, isLoading, error ];
}