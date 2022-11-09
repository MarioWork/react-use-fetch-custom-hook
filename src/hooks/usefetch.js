import { useEffect, useReducer } from "react"

const actions = {
    LOADING: 'Loading',
    FETCHED: 'Fetched',
    ERROR: 'Error'
}

const useFetch = (url, options) => {
    const initialState = {
        isLoading: false,
        data: undefined,
        error: undefined,
    }

    const fetchReducer = (state, action) => {
        switch (action.type) {
            case actions.LOADING:
                return { ...initialState, isLoading: true };
            case actions.FETCHED:
                return { ...initialState, data: action.payload };
            case actions.ERROR:
                return { ...initialState, error: action.payload };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        if (!url) return;

        const fetchData = async () => {
            try {
                dispatch({ type: actions.LOADING })

                const response = await fetch(url, options);

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = await response.json();

                dispatch({ type: actions.FETCHED, payload: data })

            } catch (error) {
                dispatch({ type: actions.ERROR, payload: error })
            }
        }

        fetchData();

    }, [url]);

    return state;
}

export default useFetch;