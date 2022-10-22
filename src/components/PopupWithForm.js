function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  buttonText,
  onSubmit,
  children,
}) {
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
            className="popup__form-submit-button"
            type="submit"
            id={`#${name}PopupSubmit`}
          >
            {`${buttonText}`}
          </button>
        </form>
      </div>
    </section>
  );
}
export default PopupWithForm;
