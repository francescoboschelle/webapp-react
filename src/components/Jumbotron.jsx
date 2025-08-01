import { Link } from "react-router-dom";

export default function Jumbotron() {
  return (
    <>
      <div className="p-5 bg-light rounded-3 flex-grow-1 text-center align-content-center">
        <div className="container py-5">
          <h1 className="display-5 fw-bold">Movies & Reviews!</h1>
          <p className="fs-4 mt-5 mb-5">
            Discover the latest movies, read honest reviews, <br /> and share
            your own opinions. Dive into a world of cinema
            <br /> and connect with fellow movie lovers. Start exploring now!
          </p>
          <Link className="btn btn-primary btn-lg" type="button" to={"/movies"}>
            Show movies
          </Link>
        </div>
      </div>
    </>
  );
}
