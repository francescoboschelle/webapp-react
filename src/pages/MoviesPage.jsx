import { useState, useEffect } from "react";
import Card from "../components/Card";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/movies`)
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className="container mb-5 mt-3">
      <h1 className="mb-3">Movies</h1>
      <div className="row g-3">
        {movies?.map((movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}
