export {createCard, deleteCard, likeCard};

// Функция создания карточки
function createCard({ name, link }, deleteCard, likeCard, openModalImg) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardNew = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardTitle = cardNew.querySelector('.card__title');
    const cardImg = cardNew.querySelector('.card__image');

    cardTitle.textContent = name;
    cardImg.src = link;
    cardImg.alt = name;
    
    const deleteButton = cardNew.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', () => deleteCard(cardNew));

    const likeButton = cardNew.querySelector('.card__like-button');
    likeButton.addEventListener('click', likeCard);

    cardImg.addEventListener('click', () => openModalImg({ name, link }));

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