// import { Route, Redirect } from "react-router-dom";
import { useState } from "react";

function Login({}) {
  
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
function handleSubmit(e) {
  e.preventDefault();
}
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
          value={email || ''}
          onChange={({ target }) => setEmail(target.value)}
        />
        <input
          className="authentication__input"
          required
          placeholder="Пароль"
          id="password"
          name="password"
          type="password"
          value={password || ''}
          onChange={({ target }) => setPassword(target.value)}
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
