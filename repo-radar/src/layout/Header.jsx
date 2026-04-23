import NavMenu from "./NavMenu"
import { Link, useNavigate } from "react-router";

function Header() {
    return (
        <header>
             {/* Logo */}
      <Link to="/" className="logo">
        RepoRadar
      </Link>
      <NavMenu />
    </header>
    )
}

export default Header
