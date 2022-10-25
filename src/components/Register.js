import { Link } from "react-router-dom";
function handleChange(e) {}
function handleSubmit(e) {
  e.preventDefault();
}

function Register({}) {
  return (
    <div className="authentication">
      <h2 className="authentication__form-title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="authentication__form">
        <input
          className="authentication__input"
          required
          placeholder="Email"
          id="email"
          name="email"
          type="email"
          value={""}
          onChange={handleChange}
        />
        <input
          className="authentication__input"
          required
          placeholder="Пароль"
          id="password"
          name="password"
          type="password"
          value={""}
          onChange={handleChange}
        />
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="authentication__form-submit-button"
        >
          Зарегистрироваться
        </button>
        <Link to="/sign-in" className="authentication__link">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;
