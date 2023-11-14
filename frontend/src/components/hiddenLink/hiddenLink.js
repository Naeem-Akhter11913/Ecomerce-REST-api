import { useSelector } from "react-redux"

const ShowOnLoin = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.auth);

    if (isLoggedIn) {
        return children
    }

    return null
}


export const ShowOnLoOut = ({ children }) => {
    const { isLoggedIn } = useSelector(state => state.auth);

    if (!isLoggedIn) {
        return children
    }

    return null
}

export default ShowOnLoin