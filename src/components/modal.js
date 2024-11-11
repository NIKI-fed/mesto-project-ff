export {openModal, closeModal};

// Функция открытия модального окна
function openModal(popup) {
    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    document.addEventListener('keydown', closeModalEsc);
    document.addEventListener('mousedown', closeModalOverlay);
};

// Функция закрытия модального окна общая
function closeModal(popupOpened) {
    if (popupOpened) {
    popupOpened.classList.remove('popup_is-opened');
    popupOpened.classList.add('popup_is-animated');
    document.removeEventListener('keydown', closeModalEsc);
    document.removeEventListener('mousedown', closeModalOverlay);
    }
};

//Функция закрытия модального окна по esc
function closeModalEsc(evt) {
    const popupOpened = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape' && popupOpened) {
        closeModal(popupOpened);
        }
    };

//Функция закрытия модального окна по overlay
function closeModalOverlay(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.target);
        }
    };
