import "./index.css"; // добавьте импорт главного файла стилей 
import {initialCards} from "./components/cards.js";
import {openModal, closeModal} from "./components/modal.js";
import {createCard, deleteCard, likeCard} from "./components/card.js";

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.places__list');

// Кнопки открытия модальных окон
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// Крестик закрытия модалки
const modalCloseButton = document.querySelectorAll('.popup__close');

// Модальные окна
const modalEditProfile = document.querySelector('.popup_type_edit');
const modalAddCard = document.querySelector('.popup_type_new-card');

// Имя и род деятельности
const nameUser = document.querySelector('.profile__title');
const jobUser = document.querySelector('.profile__description');

const formEditProfil = document.forms['edit-profile'];
const nameInput = formEditProfil.name;
const jobInput = formEditProfil.description;

const newPlaceForm = document.forms['new-place'];
const newPlaceName = newPlaceForm['place-name'];
const newPlaceLink = newPlaceForm['link'];

const captionImg = document.querySelector('.popup__caption');
const linkImg = document.querySelector('.popup__image');
const modalImg = document.querySelector('.popup_type_image');

// Вывести карточки на страницу
initialCards.forEach(item => {
  cardsList.append(createCard(item, deleteCard, likeCard, openModalImg));
});

// Открытие модалки редактирования профиля
editProfileButton.addEventListener('click', function() {
  openModal(modalEditProfile);
  nameInput.value = nameUser.textContent;
  jobInput.value = jobUser.textContent;
  });

// Обработчик «отправки» формы (пока без отправки)
function handleFormEditProfilSubmit(evt) {
    evt.preventDefault();
    const newNameInput = nameInput.value;
    const newJobInput = jobInput.value;
    nameUser.textContent = newNameInput;
    jobUser.textContent = newJobInput;
    closeModal(modalEditProfile);
};
formEditProfil.addEventListener('submit', handleFormEditProfilSubmit);

// Открытие модалки добавления карточки
addCardButton.addEventListener('click', () => openModal(modalAddCard));

// Добавление карточки
function handleAddCard(evt) {
  evt.preventDefault();
  const data = {name: newPlaceName.value, link: newPlaceLink.value};
  cardsList.prepend(createCard(data, deleteCard, likeCard, openModalImg));
  newPlaceForm.reset();
  closeModal(modalAddCard);
}
newPlaceForm.addEventListener('submit', handleAddCard);

//Закрытие модального окна по крестику
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