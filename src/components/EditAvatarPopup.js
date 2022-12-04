import { useEffect } from "react";
import { useFormWitchValidation } from "../hooks/useForms";
import PopupWithForm from "./PopupWithForm";

<<<<<<< HEAD
const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isSending }) => {
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWitchValidation();

  useEffect(() => {
    resetForm({}, true);
  }, [resetForm, isOpen]);

=======
const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatarRef = useRef();

>>>>>>> 900d2f8b5a2f9615edbc08aa576d4753457bbe5a
  const handleSubmit = (e) => {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    onUpdateAvatar({
      avatar: e.target.avatar.value,
    }); 
  };

  console.log(values);
  return (
    <PopupWithForm
      name={"avatar"}
      title={"Обновить аватар"}
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isSending ? "Сохранение..." : "Сохранить"}
      onSubmit={handleSubmit}
      isDisabled={!isValid || isSending}
    >
      <div className="popup__field">
        <input
          className="popup__input"
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на аватар"
          value={values.avatar || ""}
          onChange={handleChange}
        />
        <span className="popup__error" id="name-error">
          {errors.name || ""}
        </span>
      </div>
    </PopupWithForm>
  );
};

export default EditAvatarPopup;
