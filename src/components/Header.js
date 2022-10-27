import logo from "../images/logo.svg";
import { Link, useLocation} from "react-router-dom";
function Header({onLogout, email}) {
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="Логотип Место" className="header__logo" />
      {location.pathname === "/sign-up" && (
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      )}
      {location.pathname === "/sign-in" && (
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      )}
      {location.pathname === "/" && (
        <div className="header__container">
          <p className="header__email">{email}</p>
          <Link to='/sign-in' className="header__logout-button" onClick={onLogout}>Выйти</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
