import logo from "../images/logo.svg";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Header() {
  const location = useLocation();
  return (
    <header className="header">
      <img src={logo} alt="Логотип Место" className="header__logo" />
      {/* {location.pathname === "/" && (
        <div className="header__contener">
          <p className="header__user-email">{email}</p>
          <Link className="header__button" to="/sign-in" onClick={() => {}}>
            Выйти
          </Link>
        </div>
      )} */}
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
    </header>
  );
}

export default Header;
