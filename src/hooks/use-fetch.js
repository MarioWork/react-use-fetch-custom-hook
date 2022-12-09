import { useEffect, useReducer } from "react"

const errors = {
    ABORT: 'AbortError'
}

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
                return { ...state, isLoading: true };
            case actions.FETCHED:
                return { ...state, data: action.payload, isLoading: false };
            case actions.ERROR:
                return { ...state, error: action.payload, isLoading: false };
            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState);

    useEffect(() => {
        if (!url) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {
            try {
                dispatch({ type: actions.LOADING })

                const response = await fetch(url, { ...options, signal });

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                const data = await response.json();

                dispatch({ type: actions.FETCHED, payload: data })

            } catch (error) {
                if (error.name == errors.ABORT) return;

                dispatch({ type: actions.ERROR, payload: error })
            }
        }

        fetchData();

        return () => controller.abort();

    }, [url]);

    return state;
}

export default useFetch;