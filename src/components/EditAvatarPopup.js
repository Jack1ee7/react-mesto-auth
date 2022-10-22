import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          className="popup__input"
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на аватар"
          ref={avatarRef}
          required
        />
        <span className="popup__error" id="avatar-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
