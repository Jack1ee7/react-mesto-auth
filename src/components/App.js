import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import Main from "./Main";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";
import InfoTooltip from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import avatarPlaceholder from "../images/avatar.svg";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "Name",
    about: "Description",
    avatar: avatarPlaceholder,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
    _id: "",
  });
  const [authResult, setAuthResult] = useState(false);
  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState("email");
  const history = useHistory();

  //placeholders on mount
  // useEffect(() => {
  //   const userPlaceholder = {
  //     name: "Name",
  //     about: "Description",
  //     avatar: avatarPlaceholder,
  //   };
  //   setCurrentUser(userPlaceholder);
  // }, []);

  // check if token in local storage, if it exists then auth user
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth(jwt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auth user by using token
  // then set loggedIn to true if successful and redirect to main page
  function auth(jwt) {
    return api.getContent(jwt).then(({ data }) => {
      if (data) {
        setEmail(data.email);
        setIsLoggedIn(true);
        history.push("/");
      }
    });
  }

  // create user profile on server then redirect to login if successful
  function handleRegister(email, password) {
    api
      .register(email, password)
      .then((res) => {
        if (res) {
          setAuthResult(true);
          setIsInfoTooltipPopupOpen(true);
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setAuthResult(false);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  // login user then redirect to main page if successful
  function handleLogin(email, password) {
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setEmail(email);
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
        setAuthResult(false);
        setIsInfoTooltipPopupOpen(true);
      });
  }

  //getting user and cards data from server
  useEffect(() => {
    if (isLoggedIn) {
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
    }
  }, [isLoggedIn]);

  function handleLogout() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  }

  //-----------------Card section----------------//

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
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

  //placeholder for user

  // name/description setter
  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
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
  function handleCardDeleteClick(card) {
    setSelectedCard({
      name: card.name,
      link: card.link,
      _id: card._id,
    });
    setIsDeleteCardPopupOpen(true);
  }

  //close all popups
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onLogout={handleLogout} email={email} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={isLoggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDeleteClick={handleCardDeleteClick}
            cards={cards}
          />
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="*">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        {isLoggedIn && <Footer />}
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
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          authResult={authResult}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
