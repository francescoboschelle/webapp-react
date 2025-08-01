import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DefaultLayout from "./layouts/DefaultLayout";
import MoviesPage from "./pages/MoviesPage";
import SingleMoviePage from "./pages/SingleMoviePage";
import NotFound from "./pages/NotFound";

// eslint-disable-next-line no-unused-vars
import * as bootstrap from "bootstrap";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:id" element={<SingleMoviePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
