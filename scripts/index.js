// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function addCard(dataCard, deleteCard) {
  const cardNew = cardTemplate.querySelector('.places__item').cloneNode(true);
  cardNew.querySelector('.card__title').textContent = dataCard.name;
  cardNew.querySelector('.card__image').src = dataCard.link;

  const deleteButton = cardNew.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  return cardNew;
};

// @todo: Функция удаления карточки

function deleteCard(event) {
  event.target.closest('.places__item').remove();
};

// @todo: Вывести карточки на страницу

initialCards.forEach(item => {
  cardsList.append(addCard(item, deleteCard));
});