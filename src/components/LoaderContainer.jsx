import { Children } from "react"
import { BeatLoader } from "react-spinners"

const LoaderContainer = ({ showLoading, children }) => {

    if (showLoading) {
        return (
            <BeatLoader color="#f0a818" loading={showLoading} size={50} />
        )
    }

    return (
        Children.map(children, child => child)
    )
}

export default LoaderContainer