(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),e.classList.add("popup_is-animated"),document.addEventListener("keydown",n),document.addEventListener("mousedown",o)}function t(e){e&&(e.classList.remove("popup_is-opened"),e.classList.add("popup_is-animated"),document.removeEventListener("keydown",n),document.removeEventListener("mousedown",o))}function n(e){var n=document.querySelector(".popup_is-opened");"Escape"===e.key&&n&&t(n)}function o(e){e.target.classList.contains("popup_is-opened")&&t(e.target)}var r={baseURL:"https://nomoreparties.co/v1/wff-cohort-27/",headers:{authorization:"4d0c4185-279f-4613-b28a-9559888241f7","Content-Type":"application/json"}},a=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))};function c(e,t,n,o){var r=e.name,a=e.link,c=e.likes,i=e.cardId,u=e.cardOwnerId,l=e.myId,s=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),d=s.querySelector(".card__title"),p=s.querySelector(".card__image"),f=s.querySelector(".card__like-sum"),m=s.querySelector(".card__delete-button"),y=s.querySelector(".card__like-button");return d.textContent=r,p.src=a,p.alt=r,0===c.length?f.style.display="none":f.textContent=c.length,u!==l?m.style.display="none":m.addEventListener("click",(function(){return t(s,i)})),y.addEventListener("click",(function(e){return n(y,i,f,e)})),c.some((function(e){return e._id===l}))&&y.classList.add("card__like-button_is-active"),p.addEventListener("click",(function(){return o({name:r,link:a})})),s}function i(e,t){(function(e){return fetch("".concat(r.baseURL,"cards/").concat(e),{method:"DELETE",headers:r.headers}).then(a)})(t).then((function(){e.remove()})).catch((function(e){alert("Ошибка удаления. Попробуйте позже."),console.log(e)}))}function u(e,t,n,o){e.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(r.baseURL,"cards/likes/").concat(e),{method:"DELETE",headers:r.headers}).then(a)}(t).then((function(e){o.target.classList.remove("card__like-button_is-active"),0===e.likes.length?n.style.display="none":n.textContent=e.likes.length})).catch((function(e){alert("Ошибка лайка. Попробуйте позже."),console.log(e)})):function(e){return fetch("".concat(r.baseURL,"cards/likes/").concat(e),{method:"PUT",headers:r.headers}).then(a)}(t).then((function(e){o.target.classList.add("card__like-button_is-active"),n.textContent=e.likes.length,n.style.display="block"})).catch((function(e){alert("Ошибка лайка. Попробуйте позже."),console.log(e)}))}function l(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}function s(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function d(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t)})),o.classList.add(t.inactiveButtonClass)}function p(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var f=document.querySelector(".places__list"),m=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),_=document.querySelector(".avatar__edit-button"),v=document.querySelectorAll(".popup__close"),h=document.querySelector(".popup_type_edit"),b=document.querySelector(".popup_type_new-card"),S=document.querySelector(".popup_update-avatar"),L=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),g=document.querySelector(".profile__image"),C=document.forms["edit-profile"],E=C.name,q=C.description,x=document.forms["update-avatar"],A=x.link,w=document.forms["new-place"],I=w["place-name"],U=w.link,T=document.querySelector(".popup__caption"),O=document.querySelector(".popup__image"),R=document.querySelector(".popup_type_image");function j(t){var n=t.name,o=t.link;e(R),T.textContent=n,O.src=o,O.alt=n}_.addEventListener("click",(function(){e(S),d(S,P)})),x.addEventListener("submit",(function(e){e.preventDefault();var n=A.value,o=x.querySelector(".popup__button");o.textContent="Сохранение...",function(e){return fetch("".concat(r.baseURL,"users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:e})}).then(a)}(n).then((function(e){g.style.backgroundImage="url(".concat(e.avatar,")")})).catch((function(e){alert("Ошибка обновления аватара. Попробуйте позже."),console.log(e)})).finally((function(){o.textContent="Сохранить",x.reset(),t(S)}))})),m.addEventListener("click",(function(){e(h),E.value=L.textContent,q.value=k.textContent,d(h,P)})),C.addEventListener("submit",(function(e){e.preventDefault();var n,o,c=E.value,i=q.value,u=C.querySelector(".popup__button");u.textContent="Сохранение...",(n=c,o=i,fetch("".concat(r.baseURL,"users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:n,about:o})}).then(a)).then((function(e){L.textContent=e.name,k.textContent=e.about})).catch((function(e){alert("Ошибка обновления. Попробуйте позже."),console.log(e)})).finally((function(){u.textContent="Сохранить",t(h)}))})),y.addEventListener("click",(function(){e(b),d(b,P)})),w.addEventListener("submit",(function(e){e.preventDefault();var n=I.value,o=U.value,l=b.querySelector(".popup__button");l.textContent="Сохранение...",function(e,t){return fetch("".concat(r.baseURL,"cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:e,link:t})}).then(a)}(n,o).then((function(e){var t=c({name:e.name,link:e.link,likes:e.likes,cardId:e._id},i,u,j);f.prepend(t)})).catch((function(e){alert("Ошибка загрузки. Попробуйте позже."),console.log(e)})).finally((function(){l.textContent="Сохранить",w.reset(),t(b)}))})),v.forEach((function(e){e.addEventListener("click",(function(){t(e.closest(".popup"))}))}));var B,P={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};B=P,Array.from(document.querySelectorAll(B.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);s(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?l(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.classList.add(o.errorClass),r.textContent=n}(e,t,t.validationMessage,n)}(e,r,t),s(n,o,t)}))}))}(e,B)})),Promise.all([fetch("".concat(r.baseURL,"users/me"),{method:"GET",headers:r.headers}).then(a),fetch("".concat(r.baseURL,"cards"),{method:"GET",headers:r.headers}).then(a)]).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,a,c,i=[],u=!0,l=!1;try{if(a=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=a.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(l)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return p(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?p(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],a=o[1];L.textContent=r.name,k.textContent=r.about,g.style.backgroundImage="url(".concat(r.avatar,")");var l=r._id;a.forEach((function(e){var t=c({name:e.name,link:e.link,likes:e.likes,cardId:e._id,cardOwnerId:e.owner._id,myId:l},i,u,j);f.append(t)}))})).catch((function(e){alert("Ошибка загрузки данных. Попробуйте позже."),console.log(e)}))})();