import "./index.css"; // добавьте импорт главного файла стилей 
import {openModal, closeModal} from "./components/modal.js";
import {createCard, likeCard} from "./components/card.js";
import {enableValidation, clearValidation} from "./components/validation.js";
import {getInfoUser, updateInfoUser, getCard, addNewCard, updateAvatar, deleteCardFromServer} from "./components/API.js";

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
const modalConfirmDelete = document.querySelector('.popup_confirm-delete')

// Данные пользователя
const nameUser = document.querySelector('.profile__title');
const jobUser = document.querySelector('.profile__description');
const avatarUser = document.querySelector('.profile__image');

// Форма редактирования профиля
const formEditProfil = document.forms['edit-profile'];
const nameInput = formEditProfil.name;
const jobInput = formEditProfil.description;

// Форма обновления аватара
const formUpdateAvatar = document.forms['update-avatar'];
const linkInput = formUpdateAvatar.link;

// Форма добавления карточки
const newPlaceForm = document.forms['new-place'];
const newPlaceName = newPlaceForm['place-name'];
const newPlaceLink = newPlaceForm['link'];

const captionImg = document.querySelector('.popup__caption');
const linkImg = document.querySelector('.popup__image');
const modalImg = document.querySelector('.popup_type_image');

// Форма подтверждения удаления
const confirmDeleteForm = document.forms['confirm-delete'];

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
      formUpdateAvatar.reset();
      closeModal(modalUpdateAvatar)
    })
    .catch((err) => {
      alert('Ошибка обновления аватара. Попробуйте позже.');
      console.log(err)
    })
    .finally(() => {
      saving(false, buttonSave);
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
      })
      .catch((err) => {
        alert('Ошибка обновления. Попробуйте позже.');
        console.log(err)
      })
      .finally(() => {
        saving(false, buttonSave);
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
      { 
        name: res.name,
        link: res.link,
        likes: res.likes,
        cardId: res._id,
        ownerName: res.owner.name,
        ownerAvatar: res.owner.avatar
      },
      openConfirmDelete,
      likeCard,
      openModalImg
    );
    console.log(res)
    cardsList.prepend(creatNewCard);
    closeModal(modalAddCard);
    newPlaceForm.reset();
  })
  .catch((err) => {
    alert('Ошибка загрузки. Попробуйте позже.');
    console.log(err)
  })
  .finally(() => {
    saving(false, buttonSave);
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





// Подтверждение удаления

let dataDeleteCard = {};

// Функция открытия окна подтверждения удаления
function openConfirmDelete(card, id) {
    dataDeleteCard = {
      card: card,
      id: id
  };
  openModal(modalConfirmDelete);
};

// Подтверждение в модалке
confirmDeleteForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const buttonConfirmDelete = modalConfirmDelete.querySelector('.popup__button');
  buttonConfirmDelete.textContent = 'Удаление...';
  deleteCardFromServer(dataDeleteCard.id)
    .then (() => {
      dataDeleteCard.card.remove();
    })
    .catch((err) => {
      alert('Ошибка удаления. Попробуйте позже.');
      console.log(err)
    })
    .finally(() => {
      closeModal(modalConfirmDelete);
      buttonConfirmDelete.textContent = 'Да';
    })
})






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
  
  // Вытаскиваем массив владельцев
    const ownerAll = dataCard.map((card) => {
      return card.owner._id;
    })
    
    // Получение карточек с сервера
    dataCard.forEach(item => {

      let sumPubl = 0
      for (let i = 0; i < ownerAll.length; i = i + 1) {
        if (ownerAll[i] === item.owner._id) {
          sumPubl = sumPubl + 1;
        }
      }

      const cardFromServer = createCard(
        { 
          name: item.name,
          link: item.link,
          likes: item.likes,
          cardId: item._id,
          cardOwnerId: item.owner._id,
          ownerName: item.owner.name,
          ownerAvatar: item.owner.avatar,
          sumPubl,
          myId
        },
        openConfirmDelete,
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


// Вывожу количество публикаций пользователя

// dataCard.forEach(card => {
//   if (card.owner._id === 
// })