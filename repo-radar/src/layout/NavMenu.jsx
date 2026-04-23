import { useState } from "react";
import { Link, useNavigate } from "react-router";

function NavMenu() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) return;

    navigate(`/users/${trimmed}`);
    setQuery("");
  };

  return (
    <nav className="nav-menu">

      

      {/* Links */}
      <div className="nav-links">
        <Link to="/compare">Compare</Link>
        <Link to="/favorites">Favorites</Link>
      </div>

      {/* Search */}
      <form onSubmit={handleSubmit} className="nav-search">
        <input
          type="text"
          placeholder="Search GitHub user..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit">
          Search
        </button>
      </form>

    </nav>
  );
}

export default NavMenu;