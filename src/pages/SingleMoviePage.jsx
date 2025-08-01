import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as Icon from "react-bootstrap-icons";

export default function SingleMoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);

  function getVoteStars(reviewIndex, vote) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (vote < 1) {
        stars.push(
          <Icon.Star
            key={`star-${reviewIndex}-${i}`}
            className="text-secondary"
          />
        );
      } else if (i <= vote) {
        stars.push(
          <Icon.StarFill
            key={`star-${reviewIndex}-${i}`}
            className="text-secondary"
          />
        );
      } else {
        stars.push(<Icon.Star key={`star-${i}`} className="text-secondary" />);
      }
    }

    return stars;
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-12 col-md-4">
            <img
              src={`${import.meta.env.VITE_BACKEND_API_URL}/${movie.image}`}
              alt={movie.title}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-12 col-md-8">
            <div className="mb-3">
              <h1>{movie.title}</h1>
              <p className="mb-2">{movie.abstract}</p>
              <small>
                <strong>Genre:</strong> {movie.genre} |{" "}
                <strong>Release Year:</strong> {movie.release_year} |{" "}
                <strong>Director:</strong> {movie.director}
              </small>
            </div>
            {movie.reviews && movie.reviews.length > 0 && (
              <>
                <div>
                  <h3>Reviews</h3>
                  <div className="accordion" id="reviewsAccordion">
                    {movie.reviews.map((review, index) => {
                      return (
                        <div className="accordion-item" key={review.review_id}>
                          <h2
                            className="accordion-header"
                            id={`heading-${index}`}
                          >
                            <button
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#collapse-${index}`}
                              aria-expanded="false"
                              aria-controls={`collapse-${index}`}
                            >
                              {review.name + " ("}
                              {getVoteStars(index, review.vote)} {")"}
                            </button>
                          </h2>
                          <div
                            id={`collapse-${index}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`heading-${index}`}
                            data-bs-parent="#reviewsAccordion"
                          >
                            <div className="accordion-body">{review.text}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
