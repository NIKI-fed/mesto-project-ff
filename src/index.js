import "./index.css"; // добавьте импорт главного файла стилей 

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(dataCard, deleteCard) {
  const cardNew = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardNew.querySelector('.card__title').textContent = dataCard.name;
  cardNew.querySelector('.card__image').src = dataCard.link;
  cardNew.querySelector('.card__image').alt = dataCard.name;

  const deleteButton = cardNew.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => deleteCard(cardNew));
  return cardNew;
};

// @todo: Функция удаления карточки

function deleteCard(cardNew) {
  cardNew.remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach(item => {
  cardsList.append(addCard(item, deleteCard));
});