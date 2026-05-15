import { useEffect, useState } from "react";
import { Link } from "react-router";

function Favorites() {

  // Store favorite users
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("favorites");

    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  // Remove a user from favorites
  const removeFavorite = (username) => {
    const updated = favorites.filter(
      (user) => user.login !== username
    );

    setFavorites(updated);

    // Update localStorage
    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  };

  return (
    <main className="favorites-page">

      <h1>Favorites</h1>

      {favorites.length === 0 && (
        <p>No favorites yet.</p>
      )}

      <section className="favorites-grid">

        {favorites.map((user) => (
          <div
            key={user.id}
            className="favorite-card"
          >

            <img
              src={user.avatar_url}
              alt={user.login}
              width="80"
            />

            <h3>{user.login}</h3>

            {/* Go to profile */}
            <Link to={`/users/${user.login}`}>
              View Profile
            </Link>

            {/* Remove button */}
            <button
              onClick={() =>
                removeFavorite(user.login)
              }
            >
              Remove
            </button>

          </div>
        ))}

      </section>

    </main>
  );
}

export default Favorites;