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

  function handleSubmit(e) {
    e.preventDefault();

    const name = e.target.inputName.value.trim();
    const vote = parseInt(e.target.inputVote.value);
    const text = e.target.inputText.value.trim();

    if (!name || name.length < 1 || name.length > 50) {
      alert("Please enter a username");
      return;
    }

    if (!vote || isNaN(vote) || vote < 1 || vote > 5) {
      alert("Please enter a valid vote (1-5)");
      return;
    }

    if (!text || text.length === 0 || text.length < 10 || text.length > 500) {
      alert("Please enter a valid review text");
      return;
    }

    const data = {
      movie_id: id,
      name: name,
      vote: vote,
      text: text,
    };

    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/movies`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.message);
        } else {
          window.location.reload();
        }
      });
  }

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  return (
    <>
      <section className="container mt-5 mb-5">
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
      </section>
      <section class="container">
        <h2>Add Review</h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-3 row">
            <div class="col-6">
              <label for="inputName" class="col-4 col-form-label">
                Username
              </label>
              <input
                type="text"
                class="form-control"
                name="inputName"
                id="inputName"
                placeholder="Username"
                min={1}
                max={50}
                required
              />
            </div>
            <div class="col-6">
              <label for="inputVote" class="col-4 col-form-label">
                Vote
              </label>
              <input
                type="number"
                class="form-control"
                name="inputVote"
                id="inputVote"
                placeholder="Vote (1-5)"
                min="1"
                max="5"
                required
              />
            </div>
          </div>
          <div class="mb-3 row">
            <div class="col-12">
              <label for="inputText" class="col-4 col-form-label">
                Review
              </label>
              <textarea
                className="form-control"
                name="inputText"
                id="inputText"
                placeholder="Review body"
                minLength={10}
                maxLength={500}
                rows={3}
                required
              />
            </div>
          </div>
          <div class="mb-3 row">
            <div class="col-sm-8">
              <button type="submit" class="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
