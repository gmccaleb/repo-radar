import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";

function SearchResults() {
  // Read query parameters from URL
  // Example: /search?q=react&type=users
  const [searchParams] = useSearchParams();

  // Search term from query string
  const query = searchParams.get("q");

  // Default search type is users
  const type = searchParams.get("type") || "users";

  // Store returned search results
  const [results, setResults] = useState([]);

  // Loading state while API request runs
  const [loading, setLoading] = useState(true);

  // Error handling state
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchResults() {
      // Stop if no query exists
      if (!query) return;

      try {
        setLoading(true);

        // Choose GitHub endpoint based on search type
        const url =
          type === "users"
            ? `https://api.github.com/search/users?q=${query}`
            : `https://api.github.com/search/repositories?q=${query}`;

        // Fetch search results
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Search failed");
        }

        // Convert response to JSON
        const data = await res.json();

        // Store results
        setResults(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        // Stop loading after request completes
        setLoading(false);
      }
    }

    // Run search whenever query or type changes
    fetchResults();
  }, [query, type]);

  if (loading) return <p>Searching...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main className="search-results">
      {/* Search heading */}
      <h1>Results for "{query}"</h1>

      {/* Result count */}
      <p>
        Showing {type} ({results.length})
      </p>

      {/* Empty state */}
      {results.length === 0 && <p>No results found.</p>}

      {/* USER RESULTS */}
      {type === "users" ? (
        <section>
          {results.map((user) => (
            <div key={user.id} className="result-card">
              <img src={user.avatar_url} alt={user.login} width="60" />

              <div>
                <h3>{user.login}</h3>

                {/* Link to user profile route */}
                <Link to={`/users/${user.login}`}>View Profile</Link>
              </div>
            </div>
          ))}
        </section>
      ) : (
        /* REPOSITORY RESULTS */
        <section>
          {results.map((repo) => (
            <div key={repo.id} className="result-card">
              <div>
                <h3>{repo.full_name}</h3>

                {/* Show description if available */}
                {repo.description && <p>{repo.description}</p>}

                <p>⭐ {repo.stargazers_count}</p>

                {/* Future repo detail route */}
                <Link to={`/repos/${repo.full_name}`}>View Repository</Link>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default SearchResults;
