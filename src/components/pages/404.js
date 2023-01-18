import Error from "../error/Error";
import { Link } from "react-router-dom";

const Page404 = () => {
    return(
        <div>
            <Error/>
            <p>Page not found</p>
            <Link to="/">Back</Link>
        </div>
    )
}
export default Page404