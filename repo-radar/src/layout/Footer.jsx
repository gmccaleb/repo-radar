function Footer() {
    let thisYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div>&copy; {thisYear} RepoRadar - Gabrielle McCaleb</div>
    </footer>
  );
}

export default Footer;
