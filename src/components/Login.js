// import { Route, Redirect } from "react-router-dom";
function handleChange(e) {}
function handleSubmit(e) {
  e.preventDefault();
}

function Login({}) {
  return (
    <div className="authentication">
      <h2 className="authentication__form-title">Вход</h2>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
