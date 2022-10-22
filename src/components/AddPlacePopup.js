import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: e.target.name.value,
      link: e.target.link.value,
    });
  }

  //clean input fields after closing/before opening popup
  useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name={"add"}
      title={"Новое место"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Создать"}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          className="popup__input"
          type="text"
          name="name"
          id="title"
          placeholder="Название"
          required
          minLength="2"
          maxLength="30"
          value={name || ""}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="title-error"></span>
      </div>
      <div className="popup__field">
        <input
          className="popup__input"
          type="url"
          name="link"
          id="link"
          placeholder="Ссылка на картинку"
          required
          value={link || ""}
          onChange={handleLinkChange}
        />
        <span className="popup__error" id="link-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
