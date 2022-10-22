import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false); //future feature
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
    _id: "",
  });
  const [cards, setCards] = useState([]);

  //getting user and cards data from server
  useEffect(() => {
    api
      .getAllData()
      .then(([userData, cardList]) => {
        //profile
        setCurrentUser(userData);
        //cards
        setCards(cardList);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }, []);

  //-----------------Card section----------------//

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id))
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    //установка стейта происходит в App
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  //---------------Add card-----------------//

  function handleAddPlaceSubmit(data) {
    api
      .sendNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  //-----------------User data section----------------//

  // name/description setter
  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((data) => setCurrentUser(data), closeAllPopups())
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }
  // avatar setter
  function handleUpdateAvatar(userData) {
    api
      .setAvatar(userData)
      .then((data) => setCurrentUser(data), closeAllPopups())
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  //-----------------Popups section----------------//

  //open profile edit popup
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  //open add card popup
  function handleAddPlaceClick() {
    setIsAddCardPopupOpen(true);
  }
  //open avatar edit popup
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  //open image on fullscreen
  function handleCardClick(card) {
    setSelectedCard({
      name: card.name,
      link: card.link,
    });
    setIsImagePopupOpen(true);
  }
  // open delete card popup
  function handleCardDeleteClick(card) {         //future feature
    setSelectedCard({
      name: card.name,
      link: card.link,
      _id: card._id,
    })
    setIsDeleteCardPopupOpen(true);
  }

  //close all popups
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false); //future feature
    setIsImagePopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDeleteClick={handleCardDeleteClick} //future feature
          cards={cards}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
          card={selectedCard}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
