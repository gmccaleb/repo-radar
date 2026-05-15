import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Button from "../reusable/Button";

function UserProfile() {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true);

        const userRes = await fetch(`https://api.github.com/users/${username}`);

        if (!userRes.ok) {
          throw new Error("User not found");
        }

        const userData = await userRes.json();
        setUser(userData);

        // Fetch user's repositories with pagination (up to 75 repos)
        const repoRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=75&sort=updated`,
        );

        const repoData = await repoRes.json();
        setRepos(repoData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [username]);

  if (loading) return <p className="loading-text">Loading profile...</p>;
  if (error) return <p className="error-text">{error}</p>;

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0,
  );

  const addFavorite = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];

    // Prevent duplicates
    const exists = stored.find((u) => u.login === user.login);

    if (exists) return;

    const updated = [...stored, user];

    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <main className="profile-page">
      <section className="profile-header">
        <img
          className="profile-avatar"
          src={user.avatar_url}
          alt={user.login}
        />
        {/* <Button
          text="Add to Favorites"
          onClick={addFavorite}
          type="button"
          className="favorite-button"
        /> */}

        <div className="profile-info">
          <h1 className="profile-name">{user.name || user.login}</h1>

          <p className="profile-username">@{user.login}</p>

          {user.bio && <p className="profile-bio">{user.bio}</p>}

          <p className="profile-followers">Followers: {user.followers}</p>

          <p className="profile-following">Following: {user.following}</p>

          <p className="profile-repos">Public Repos: {user.public_repos}</p>

          <p className="profile-stars">Total Stars: {totalStars}</p>
        </div>
        <Button
          text="Add to Favorites"
          onClick={addFavorite}
          type="button"
          className="favorite-button"
        />
      </section>

      <section className="repo-section">
        <h2 className="repo-title">Repositories</h2>

        {repos.map((repo) => (
          <div key={repo.id} className="repo-card">
            <h3 className="repo-name">{repo.name}</h3>

            {repo.description && (
              <p className="repo-description">{repo.description}</p>
            )}

            <p className="repo-language">Language: {repo.language || "N/A"}</p>

            <p className="repo-stats">
              ⭐ {repo.stargazers_count} | Forks: {repo.forks_count}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}

export default UserProfile;
