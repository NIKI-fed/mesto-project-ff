import "./index.css"; // добавьте импорт главного файла стилей 
import {openModal, closeModal} from "./components/modal.js";
import {createCard, deleteCard, likeCard} from "./components/card.js";
import {enableValidation, clearValidation} from "./components/validation.js";
import {getInfoUser, updateInfoUser, getCard, addNewCard, updateAvatar} from "./components/API.js";

const cardsList = document.querySelector('.places__list');

// Кнопки открытия модальных окон
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const updateAvatarButton = document.querySelector('.avatar__edit-button');

// Крестик закрытия модалки
const modalCloseButton = document.querySelectorAll('.popup__close');

// Модальные окна
const modalEditProfile = document.querySelector('.popup_type_edit');
const modalAddCard = document.querySelector('.popup_type_new-card');
const modalUpdateAvatar = document.querySelector('.popup_update-avatar');

// Данные пользователя
const nameUser = document.querySelector('.profile__title');
const jobUser = document.querySelector('.profile__description');
const avatarUser = document.querySelector('.profile__image');

const formEditProfil = document.forms['edit-profile'];
const nameInput = formEditProfil.name;
const jobInput = formEditProfil.description;

const formUpdateAvatar = document.forms['update-avatar'];
const linkInput = formUpdateAvatar.link;

// Карточки
const newPlaceForm = document.forms['new-place'];
const newPlaceName = newPlaceForm['place-name'];
const newPlaceLink = newPlaceForm['link'];

const captionImg = document.querySelector('.popup__caption');
const linkImg = document.querySelector('.popup__image');
const modalImg = document.querySelector('.popup_type_image');

// Открытие модалки редактирования аватара
updateAvatarButton.addEventListener('click', function() {
  openModal(modalUpdateAvatar);
  clearValidation(modalUpdateAvatar, config);
  });

// Обработчик обновления аватара
function handleFormUpdateAvatar(evt) {
  evt.preventDefault();
  const avatarLink = linkInput.value;
  const buttonSave = formUpdateAvatar.querySelector('.popup__button');
  saving(true, buttonSave);
  updateAvatar(avatarLink)
    .then((res) => {
      avatarUser.style.backgroundImage = `url(${res.avatar})`
      saving(false, buttonSave);
      formUpdateAvatar.reset();
      closeModal(modalUpdateAvatar)
    })
    .catch((err) => {
      alert('Ошибка обновления аватара. Попробуйте позже.');
      console.log(err)
    })
};
formUpdateAvatar.addEventListener('submit', handleFormUpdateAvatar);

// Открытие модального окна редактирования профиля
editProfileButton.addEventListener('click', function() {
  openModal(modalEditProfile);
  nameInput.value = nameUser.textContent;
  jobInput.value = jobUser.textContent;
  clearValidation(modalEditProfile, config);
  });

// Обработчик отправки формы с данными пользователя
function handleFormEditProfilSubmit(evt) {
    evt.preventDefault();
    const newNameInput = nameInput.value;
    const newJobInput = jobInput.value;
    const buttonSave = formEditProfil.querySelector('.popup__button')
    saving(true, buttonSave);
    updateInfoUser(newNameInput, newJobInput)
      .then((res) => {
        nameUser.textContent = res.name;
        jobUser.textContent = res.about;
        closeModal(modalEditProfile);
        saving(false, buttonSave);
      })
      .catch((err) => {
        alert('Ошибка обновления. Попробуйте позже.');
        console.log(err)
      })
};
formEditProfil.addEventListener('submit', handleFormEditProfilSubmit);

// Открытие модалки добавления карточки
addCardButton.addEventListener('click', function() {
  openModal(modalAddCard);
  clearValidation(modalAddCard, config);
  //newPlaceForm.reset();
});

// Добавление карточки
function handleAddCard(evt) {
  evt.preventDefault();
  const name = newPlaceName.value;
  const link = newPlaceLink.value;
  const buttonSave = modalAddCard.querySelector('.popup__button');
  saving(true, buttonSave);
  addNewCard(name, link)
  .then ((res) => {
    const creatNewCard = createCard(
      { name: res.name,
        link: res.link,
        likes: res.likes,
        cardId: res._id },
      deleteCard,
      likeCard,
      openModalImg
    );
    cardsList.prepend(creatNewCard);
    saving(false, buttonSave);
    closeModal(modalAddCard);
    newPlaceForm.reset();
  })
  .catch((err) => {
  alert('Ошибка загрузки. Попробуйте позже.');
  console.log(err)
  })
}
newPlaceForm.addEventListener('submit', handleAddCard);

// Закрытие модального окна по крестику
modalCloseButton.forEach(function(item) {
  item.addEventListener('click', function() {
    closeModal(item.closest('.popup'));
  });
});

// Функция увеличения картинки
function openModalImg({ name, link }) {
  openModal(modalImg);
  captionImg.textContent = name;
  linkImg.src = link;
  linkImg.alt = name;
};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// Вызов общей функции валидации полей
enableValidation(config);

// ----------------Работа с сервером---------------

Promise.all([getInfoUser(), getCard()])
  // Получение информации о пользователе с сервера
  .then(([dataUser, dataCard]) => {
    nameUser.textContent = dataUser.name;
    jobUser.textContent = dataUser.about;
    
    avatarUser.style.backgroundImage = `url(${dataUser.avatar})`;
    const myId = dataUser._id;
    
    // Получение карточек с сервера
    dataCard.forEach(item => {
      const cardFromServer = createCard(
        { name: item.name,
          link: item.link,
          likes: item.likes,
          cardId: item._id,
          cardOwnerId: item.owner._id,
          myId
        },
        deleteCard,
        likeCard,
        openModalImg
      );
        cardsList.append(cardFromServer);
      });
  })
  .catch((err) => {
    alert('Ошибка загрузки данных. Попробуйте позже.');
    console.log(err)
  });

// Функция изменения текста на кнопке
function saving(boolean, button) {
  if (boolean === true) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}