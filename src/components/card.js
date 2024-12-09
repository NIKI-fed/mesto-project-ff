export {createCard, likeCard};
import {putLike, removeLike} from "../components/API.js"

// Функция создания карточки
function createCard(
    { 
        name,
        link,
        likes,
        cardId,
        cardOwnerId,
        ownerName,
        ownerAvatar,
        sumPubl,
        myId
    },
    openConfirmDelete,
    likeCard,
    openModalImg
) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardNew = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardTitle = cardNew.querySelector('.card__title');
    const cardImg = cardNew.querySelector('.card__image');
    const cardLikes = cardNew.querySelector('.card__like-sum');
    const cardOwnerName = cardNew.querySelector('.card__autor-name')
    const cardOwnerAvatar = cardNew.querySelector('.card__autor-image')
    const publications = cardNew.querySelector('.card__autor-publications')

    const deleteButton = cardNew.querySelector('.card__delete-button');
    const likeButton = cardNew.querySelector('.card__like-button');
    const likers = cardNew.querySelector('.who-like');

    cardOwnerName.textContent = ownerName;
    cardOwnerAvatar.style.backgroundImage = `url(${ownerAvatar})`;
    publications.textContent = `${'Публикаций: ' + sumPubl}`;

    cardTitle.textContent = name;
    cardImg.src = link;
    cardImg.alt = name;
    if (likes.length === 0) {
        cardLikes.style.display = 'none';
    } else {
        cardLikes.textContent = likes.length;
        }
    
    // Слушатель на удаление карточки
    if (!(cardOwnerId === myId)) {
        deleteButton.style.display = 'none';
    } else {
        //deleteButton.addEventListener('click', () => deleteCard(cardNew, cardId));
        deleteButton.addEventListener('click', () => openConfirmDelete(cardNew, cardId));
    }
    // Слушатель на лайк карточки
    likeButton.addEventListener('click', (evt) => likeCard(likeButton, cardId, cardLikes, evt));

    if(likes.some(function(item) {
        return item._id === myId
    })) {
        likeButton.classList.add('card__like-button_is-active');
    };

    // Слушатель на лайк для появления списка лайкнувших
    likeButton.addEventListener('mouseover', function() {
        likers.style.display = 'block';
    });

    likeButton.addEventListener('mouseout', function() {
        likers.style.display = 'none';
    });

    // Слушатель на увеличение карточки
    cardImg.addEventListener('click', () => openModalImg({ name, link }));
    
    return cardNew;
};














// // Функция открытия окна подтверждения удаления
// function confirmDelete(cardNew, cardId) {
//     const dataDeleteCard = {
//         card: cardNew,
//         id: cardId
//     };
//     openModal(modalConfirmDelete);
//     };

// Функция удаления карточки с сервера
// function deleteCard(cardNew, cardId) {
//     deleteCardFromServer(cardId)
//         .then (() => {
//             cardNew.remove();
//             })

//         .catch((err) => {
//             alert('Ошибка удаления. Попробуйте позже.');
//             console.log(err)
//             })
//         .finally(() => {
//             closeModal(modalConfirmDelete);
//         })
// };

// Лайк карточки
function likeCard(likeButton, cardId, cardLikes, evt) {
    if (!(likeButton.classList.contains('card__like-button_is-active'))) {
        putLike(cardId)
        .then ((res) => {
            evt.target.classList.add('card__like-button_is-active');
            cardLikes.textContent = res.likes.length;
            cardLikes.style.display = 'block';
        })
        .catch((err) => {
            alert('Ошибка лайка. Попробуйте позже.');
            console.log(err)
        })
    } else {
        removeLike(cardId)
        .then ((res) => {
            evt.target.classList.remove('card__like-button_is-active');
            if (res.likes.length === 0) {
                cardLikes.style.display = 'none';
            } else {
                cardLikes.textContent = res.likes.length;
            }        
        })
        .catch((err) => {
            alert('Ошибка лайка. Попробуйте позже.');
            console.log(err)
        })
    }
};

// // Появление списка лайкнувших
// function likers(card, likeBut) {
    
// }