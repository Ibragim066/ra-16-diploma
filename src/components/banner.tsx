import {Image} from "react-bootstrap";

export default function Banner() {
    return (
        <div className="banner mb-3">
            <Image src="./img/banner.jpg" alt="К весне готовы!"/>
            <h2 className="banner-header">К весне готовы!</h2>
        </div>
    )
}