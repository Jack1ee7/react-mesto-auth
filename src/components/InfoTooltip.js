import success from "../images/auth-succes-icon.svg";
import error from "../images/auth-error-icon.svg";
<<<<<<< HEAD
const InfoTooltip = ({ isOpen, authResult, onClose }) => {
=======
import { useEffect } from "react";
const InfoTooltip = ({ isOpen, authResult, onClose }) => {

>>>>>>> 900d2f8b5a2f9615edbc08aa576d4753457bbe5a
  const icon = authResult ? success : error;
  const text = authResult ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз.";

  useEffect(() => {
    if (!isOpen) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  return (
    <section
      className={`popup ${isOpen ? "popup_status_opened" : ""}`}
      id="popupInfoTooltip"
    >
      <div className="overlay" onClick={onClose}></div>
      <div className="popup__container popup__container_type_auth">
        <button
          className="popup__close-button"
          type="reset"
          id="#"
          onClick={onClose}
        />
        <img src={icon} alt="success" />
        <h2 className="popup__title">{text}</h2>
      </div>
    </section>
  );
}
export default InfoTooltip;
