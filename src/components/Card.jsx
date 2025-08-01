import { Link } from "react-router-dom";

export default function Card({ movie }) {
  return (
    <>
      <div className="col-12 col-md-6 col-lg-4">
        <div className="card h-100">
          <Link
            to={`/movies/${movie.id}`}
            className="text-decoration-none text-dark"
          >
            <img
              className="card-img-top"
              src={`${import.meta.env.VITE_BACKEND_API_URL}/${movie.image}`}
              alt="Title"
            />
            <div className="card-body">
              <h4 className="card-title">{movie.title}</h4>
              <p className="card-text">{movie.abstract}</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
