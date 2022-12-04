<<<<<<< HEAD
const PopupWithForm = ({
=======
import { useEffect } from "react";

const PopupWithForm = ({
  name,
  title,
>>>>>>> 900d2f8b5a2f9615edbc08aa576d4753457bbe5a
  isOpen,
  onSubmit,
  onClose,
  title,
  name,
  buttonText,
  isDisabled = false,
  children,
}) => {
  
<<<<<<< HEAD
=======
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

>>>>>>> 900d2f8b5a2f9615edbc08aa576d4753457bbe5a
  return (
    <section
      className={`popup popup_type_${name} ${
        isOpen ? "popup_status_opened" : ""
      }`}
      id="#popupEdit"
    >
      <div className="overlay" onClick={onClose}></div>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="reset"
          id="#"
          onClick={onClose}
        ></button>
        <h2 className="popup__form-title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={`${name}`}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className={`popup__form-submit-button ${
              isDisabled && "popup__form-submit-button_disabled"
              }`}
            type="submit"
            disabled={isDisabled}
          > 
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
