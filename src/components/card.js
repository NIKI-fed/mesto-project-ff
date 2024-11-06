export {createCard, deleteCard, likeCard};

// Функция создания карточки
function createCard(dataCard, deleteCard, likeCard, openImg) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardNew = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardNew.querySelector('.card__title').textContent = dataCard.name;
    cardNew.querySelector('.card__image').src = dataCard.link;
    cardNew.querySelector('.card__image').alt = dataCard.name;
    
    const deleteButton = cardNew.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardNew));

    const likeButton = cardNew.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCard);

    const cardsList = document.querySelector('.places__list');
    cardsList.addEventListener('click', openImg);

    return cardNew;
};

// Функция удаления карточки
function deleteCard(cardNew) {
    cardNew.remove();
};

// Лайк карточки
function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};