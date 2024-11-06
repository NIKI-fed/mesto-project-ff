import "./index.css"; // добавьте импорт главного файла стилей 
import {initialCards} from "./components/cards.js";
import {openModal, closeModal} from "./components/modal.js";
import {createCard, deleteCard, likeCard} from "./components/card.js";

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

// Кнопки открытия попапов
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Кнопки закрытия попапов X
const closePopupX = document.querySelectorAll('.popup__close');

// Попапы
const editProfile = document.querySelector('.popup_type_edit');
const addCard = document.querySelector('.popup_type_new-card');

// Имя и род деятельности
const nameUser = document.querySelector('.profile__title');
const jobUser = document.querySelector('.profile__description');

const formElement = document.forms['edit-profile'];
const nameInput = formElement.name;
const jobInput = formElement.description;

const newPlaceForm = document.forms['new-place'];
const newPlaceName = newPlaceForm['place-name'];
const newPlaceLink = newPlaceForm['link'];

const captionImg = document.querySelector('.popup__caption');
const linkImg = document.querySelector('.popup__image');
const scaleImg = document.querySelector('.popup_type_image');

// Вывести карточки на страницу
initialCards.forEach(item => {
  cardsList.append(createCard(item, deleteCard, likeCard, openImg));
});

// Открытие модалки редактирования профиля
editProfileButton.addEventListener('click', function() {
  openModal(editProfile);
  nameInput.value = nameUser.textContent;
  jobInput.value = jobUser.textContent;
  });

// Обработчик «отправки» формы (пока без отправки)
function handleFormSubmit(evt) {
    evt.preventDefault();
    const newNameInput = nameInput.value;
    const newJobInput = jobInput.value;
    nameUser.textContent = newNameInput;
    jobUser.textContent = newJobInput;
    closeModal();
};
formElement.addEventListener('submit', handleFormSubmit);

// Открытие модалки добавления карточки
addCardButton.addEventListener('click', function() {
  openModal(addCard);
});

// Добавление карточки
function handleAddCard(evt) {
  evt.preventDefault();
  const data = {name: newPlaceName.value, link: newPlaceLink.value};
  cardsList.prepend(createCard(data, deleteCard, likeCard));
  newPlaceForm.reset();
  closeModal();
}
newPlaceForm.addEventListener('submit', handleAddCard);

//Закрытие попапа по X
closePopupX.forEach(function(item) {
  item.addEventListener('click', function() {
    closeModal();
  });
});

// Функция увеличения картинки
function openImg(evt) {
  captionImg.textContent = evt.target.alt;
  linkImg.src = evt.target.src;
  linkImg.alt = evt.target.alt;
  if (evt.target.classList.contains('card__image')) {
    openModal(scaleImg);
  }
};