import { useState } from "react";
import { useNavigate } from "react-router";

function Home() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) return;

    // Default: user search flow
    navigate(`/users/${trimmed}`);
    setQuery("");
  };

  return (
    <main className="home">

      {/* HERO */}
      <section className="home-hero">
        <h1>RepoRadar</h1>
        <p>
          Discover GitHub developers, explore repositories, and compare profiles
          in one clean dashboard.
        </p>
      </section>

      {/* QUICK START SEARCH */}
      <section className="home-search-block">
        <h2>Quick Start</h2>
        <p>Search a GitHub username to begin exploring</p>

        <form onSubmit={handleSearch} className="home-search">
          <input
            type="text"
            placeholder="e.g. torvalds"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button type="submit">Search User</button>
        </form>
      </section>

      {/* FEATURES */}
      <section className="home-section">
        <h2>What you can do</h2>

        <ul>
          <li>🔍 Search GitHub developers instantly</li>
          <li>📊 View profile stats and repositories</li>
          <li>⚖️ Compare developers side-by-side</li>
          <li>⭐ Save your favorite developers</li>
        </ul>
      </section>

      {/* OPTIONAL FUTURE EXPANSION HINT */}
      <section className="home-footer">
        <p>
          Powered by the GitHub API. Built for developer discovery.
        </p>
      </section>

    </main>
  );
}

export default Home;