import { Link, useMatch, useResolvedPath } from "react-router-dom"
import "../css/navbar.css"

export function Navbar() {
    return (
        <nav className="navdark">
            <Link to="/" className="site-title">
              Mon Chou
            </Link> 
          <ul>
            <CustomLink to="/insumos">Inventario</CustomLink>
            <CustomLink to="/recetas">Recetas</CustomLink>
            <CustomLink to="/restock">Restock</CustomLink>
            <CustomLink to="/ventas">Ventas</CustomLink>
          </ul>
        </nav>
    )
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
}