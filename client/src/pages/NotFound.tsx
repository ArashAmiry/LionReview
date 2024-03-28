import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./stylesheets/NotFound.css"

export default function NotFound() {
    return (
        <Container fluid className="err-container d-flex flex-column align-items-center justify-content-center ">
            <h1 className="err-msg">Oops! You seem to be lost.</h1>
        </Container>
    )
}