import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button from "../reusable/Button";

function NavMenu() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = query.trim();

    if (!trimmed) return;

    // Send search query to results page
    navigate(`/search?q=${trimmed}&type=users`);

    setQuery("");
  };

  return (
    <nav className="nav-menu">
      {/* Main navigation links */}
      <div className="nav-links">
        <Link to="/compare">Compare</Link>

        <Link to="/favorites">Favorites</Link>
      </div>

      {/* Global search */}
      <form onSubmit={handleSubmit} className="nav-search">
        <input
          type="text"
          placeholder="Search GitHub user..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <Button
          type="submit"
          onClick={handleSubmit}
          className="submit"
          text="Search"
        />
      </form>
    </nav>
  );
}

export default NavMenu;
