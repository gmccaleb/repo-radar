import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";

function SearchResults() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");
  const type = searchParams.get("type") || "users";

  const [results, setResults] = useState([]);

  useEffect(() => {
    async function fetchResults() {
      if (!query) return;

      const url =
        type === "users"
          ? `https://api.github.com/search/users?q=${query}`
          : `https://api.github.com/search/repositories?q=${query}`;

      const res = await fetch(url);
      const data = await res.json();

      setResults(data.items || []);
    }

    fetchResults();
  }, [query, type]);

  return (
    <main>
      <h1>Search Results</h1>

      {type === "users" ? (
        <div>
          {results.map((user) => (
            <Link key={user.id} to={`/users/${user.login}`}>
              {user.login}
            </Link>
          ))}
        </div>
      ) : (
        <div>
          {results.map((repo) => (
            <Link key={repo.id} to={`/repos/${repo.full_name}`}>
              {repo.full_name}
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default SearchResults;