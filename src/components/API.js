export {
    getInfoUser,
    updateInfoUser,
    getCard,
    addNewCard,
    deleteCardFromServer,
    putLike,
    removeLike,
    updateAvatar
}

const config = {
    baseURL: 'https://nomoreparties.co/v1/wff-cohort-27/',
    headers: {
        authorization: '4d0c4185-279f-4613-b28a-9559888241f7',
        'Content-Type': 'application/json'
    }
}

// Проверка ответа от сервера
const checkRes = (res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
});

// Обновление аватара пользователя
function updateAvatar(avatarLink) {
    return fetch(`${config.baseURL}users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify( { avatar: avatarLink } )
    })
    .then(checkRes);
}

// Запрос информации о пользователе
function getInfoUser() {
    return fetch(`${config.baseURL}users/me`, {
        method: "GET",
        headers: config.headers
    })
    .then(checkRes);
}

// Обновление данных пользователя
function updateInfoUser(name, about) {
    return fetch(`${config.baseURL}users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify( { name, about } )
    })
    .then(checkRes);
}


// Запрос массива карточек с сервера
function getCard() {
    return fetch(`${config.baseURL}cards`, {
        method: "GET",
        headers: config.headers
    })
    .then(checkRes);
}

// Добавление новой карточки
function addNewCard(name, link) {
    return fetch(`${config.baseURL}cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify( { name, link } )
    })
    .then(checkRes);
}

// Удаление своих карточек
function deleteCardFromServer(cardId) {
    return fetch(`${config.baseURL}cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    })
    .then(checkRes);
}

// Поставить лайк
function putLike(cardId) {
    return fetch(`${config.baseURL}cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers,
    })
    .then(checkRes);
}

// Снять лайк
function removeLike(cardId) {
    return fetch(`${config.baseURL}cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers,
    })
    .then(checkRes);
}

