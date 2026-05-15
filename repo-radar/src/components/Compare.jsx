import { useState } from "react";
import Button from "../reusable/Button";

function Compare() {
  // Input usernames
  const [user1, setUser1] = useState("");
  const [user2, setUser2] = useState("");

  // Full user data
  const [data1, setData1] = useState(null);
  const [data2, setData2] = useState(null);

  // Extra computed stats
  const [stats1, setStats1] = useState(null);
  const [stats2, setStats2] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch repos and compute totals
  const fetchExtraStats = async (username) => {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100`,
    );

    const repos = await res.json();

    let stars = 0;
    let forks = 0;

    // Sum up stars and forks across all repos
    repos.forEach((repo) => {
      stars += repo.stargazers_count;
      forks += repo.forks_count;
    });

    return { stars, forks };
  };

  const handleCompare = async (e) => {
    e.preventDefault();

    if (!user1 || !user2) return;

    try {
      setLoading(true);
      setError("");

      // Fetch basic profiles
      const res1 = await fetch(`https://api.github.com/users/${user1}`);
      const res2 = await fetch(`https://api.github.com/users/${user2}`);

      if (!res1.ok || !res2.ok) {
        throw new Error("One or both users not found");
      }

      const u1 = await res1.json();
      const u2 = await res2.json();

      setData1(u1);
      setData2(u2);

      // Fetch extra stats
      const s1 = await fetchExtraStats(user1);
      const s2 = await fetchExtraStats(user2);

      setStats1(s1);
      setStats2(s2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="compare-page">
      <h1>Compare Developers</h1>

      {/* Input form */}
      <form onSubmit={handleCompare} className="compare-form">
        <input
          placeholder="User 1"
          value={user1}
          onChange={(e) => setUser1(e.target.value)}
        />

        <input
          placeholder="User 2"
          value={user2}
          onChange={(e) => setUser2(e.target.value)}
        />

        <Button
          type="submit"
          onClick={handleCompare}
          className="compare"
          text="Compare"
        />
      </form>

      {/* States */}
      {loading && <p>Loading comparison...</p>}
      {error && <p>{error}</p>}

      {/* Results */}
      {data1 && data2 && stats1 && stats2 && (
        <section className="compare-grid">
          {/* USER 1 */}
          <div className="compare-card">
            <h2>{data1.login}</h2>
            <img src={data1.avatar_url} width="100" />

            <p>Followers: {data1.followers}</p>
            <p>Repos: {data1.public_repos}</p>

            <p>⭐ Stars: {stats1.stars}</p>
            <p>🍴 Forks: {stats1.forks}</p>
          </div>

          <div className="vs">VS</div>

          {/* USER 2 */}
          <div className="compare-card">
            <h2>{data2.login}</h2>
            <img src={data2.avatar_url} width="100" />

            <p>Followers: {data2.followers}</p>
            <p>Repos: {data2.public_repos}</p>

            <p>⭐ Stars: {stats2.stars}</p>
            <p>🍴 Forks: {stats2.forks}</p>
          </div>
        </section>
      )}
    </main>
  );
}

export default Compare;
