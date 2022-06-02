'use strict';

const BODY = document.querySelector('.body');
const NAV_BURGER = document.querySelector('.nav__burger');
const HEADER_NAV = document.querySelector('.header__nav');
const DARKNESS = document.querySelector('.darkness');
const NAV_LIST = document.querySelector('.nav__list');
const HEADER_CONTAINER = document.querySelector('.header__container');
const SLIDER_BTN_LEFT = document.querySelector('.slider__btn_left');
const SLIDER_BTN_RIGHT = document.querySelector('.slider__btn_right');
const CARUSEL = document.querySelector('.slider__carousel');
const SLIDER_LIST_LEFT = CARUSEL.querySelector('.slider__list_left');
const SLIDER_LIST_RIGHT = CARUSEL.querySelector('.slider__list_right');
const SLIDER_LIST_ACTIVE = CARUSEL.querySelector('.slider__list_active');
const MODAL = document.querySelector('.modal');
const MODAL_WINDOW = MODAL.querySelector('.modal__window');
const MODAL_CLOSE_BTN = MODAL.querySelector('.modal__close-btn');
const MODAL_CONTENT_WRAPPER = MODAL.querySelector('.modal__content-wrapper');

// burger

NAV_BURGER.addEventListener('click', () => {
	HEADER_NAV.classList.toggle('open');
	DARKNESS.classList.toggle('darkness-active');
	NAV_BURGER.classList.toggle('opener');
	BODY.classList.toggle('lock');
	HEADER_CONTAINER.classList.toggle('header__container_open');
})

function closeMenu() {
	HEADER_NAV.classList.remove('open');
	DARKNESS.classList.remove('darkness-active');
	NAV_BURGER.classList.remove('opener');
	BODY.classList.remove('lock');
	HEADER_CONTAINER.classList.remove('header__container_open');
}

function closeMenuWhenClickingOnLink(event) {
	if (event.target.classList.contains('nav__link')) {
		closeMenu()
	}
}

NAV_LIST.addEventListener('click', closeMenuWhenClickingOnLink);

DARKNESS.addEventListener('click', closeMenu);


// slider

const res = await fetch("../pets.json");
const pets = await res.json();

const createCardTemplate = () => {
	const card = document.createElement('li');
	card.classList.add('slider__item');
	return card;
}

const moveLeft = () => {
	CARUSEL.classList.add('transition-left');
	SLIDER_BTN_LEFT.removeEventListener('click', moveLeft);
	SLIDER_BTN_RIGHT.removeEventListener('click', moveRight);
}

const moveRight = () => {
	CARUSEL.classList.add('transition-right');
	SLIDER_BTN_RIGHT.removeEventListener('click', moveRight);
	SLIDER_BTN_LEFT.removeEventListener('click', moveLeft);
}

SLIDER_BTN_LEFT.addEventListener('click', moveLeft);
SLIDER_BTN_RIGHT.addEventListener('click', moveRight);



CARUSEL.addEventListener('animationend', (event) => {
	let changedList;
	if (event.animationName === 'move-left') {
		CARUSEL.classList.remove('transition-left');
		changedList = SLIDER_LIST_LEFT;
		SLIDER_LIST_ACTIVE.innerHTML = SLIDER_LIST_LEFT.innerHTML;

	} else {
		CARUSEL.classList.remove('transition-right');
		changedList = SLIDER_LIST_RIGHT;
		SLIDER_LIST_ACTIVE.innerHTML = SLIDER_LIST_RIGHT.innerHTML;
	}


	let newListPetsFull = [];
	let currentListPets = [];

	for (const item of changedList.children) {
		currentListPets.push(+item.dataset.modalBtn);
	}

	for (const itemPets of currentListPets) {
		let newPet = Math.floor(Math.random() * 8);
		while (currentListPets.includes(newPet) || newListPetsFull.includes(newPet)) {
			newPet = Math.floor(Math.random() * 8);
		}
		newListPetsFull.push(newPet);
	}

	let newListPets;

	let windowWidth = document.documentElement.clientWidth;
	if (windowWidth >= 1280) {
		newListPets = newListPetsFull;
	} else if (windowWidth < 1280 && windowWidth >= 768) {
		newListPets = newListPetsFull.slice(0, 2);
	} else {
		newListPets = newListPetsFull.slice(0, 1);
	}

	changedList = SLIDER_LIST_LEFT;
	changedList.innerHTML = "";


	for (let i = 0; i < newListPets.length; i++) {

		const card = createCardTemplate();
		card.setAttribute("data-modal-btn", `${pets[newListPets[i]].atribute}`);
		card.innerHTML = `
			<img class="slider__img" src="${pets[newListPets[i]].img}" alt="${pets[newListPets[i]].type + ' ' + pets[newListPets[i]].name}" width="270" height="270">
			<span class="slider__pet-name">${pets[newListPets[i]]["name"]}</span>
			<button class="btn btn__button">Learn more</button>
		`;
		changedList.appendChild(card);
	}

	changedList = SLIDER_LIST_RIGHT;
	changedList.innerHTML = "";

	for (let i = 0; i < newListPets.length; i++) {

		const card = createCardTemplate();
		card.setAttribute("data-modal-btn", `${pets[newListPets[i]].atribute}`);
		card.innerHTML = `
			<img class="slider__img" src="${pets[newListPets[i]].img}" alt="${pets[newListPets[i]].type + ' ' + pets[newListPets[i]].name}" width="270" height="270">
			<span class="slider__pet-name">${pets[newListPets[i]]["name"]}</span>
			<button class="btn btn__button">Learn more</button>
		`;
		changedList.appendChild(card);
	}

	SLIDER_BTN_LEFT.addEventListener('click', moveLeft);
	SLIDER_BTN_RIGHT.addEventListener('click', moveRight);
})

// Modal

CARUSEL.addEventListener('click', function (event) {
	if (event.target.closest('.slider__item')) {
		let indexPets = event.target.closest('.slider__item').dataset.modalBtn;
		getModalWindow(indexPets)
		DARKNESS.classList.toggle('darkness-active');
		BODY.classList.add('lock');
	}
})

function getModalWindow(atribute) {
	MODAL_CONTENT_WRAPPER.insertAdjacentHTML('beforeend', `	
		<img src="${pets[atribute].img}" alt="Dog Jennifer" class="modal__img">
		<div class="modal__content">
			<h3 class="modal__title">${pets[atribute].name}</h3>
			<h4 class="modal__subtitle">${pets[atribute].type} - ${pets[atribute].breed}</h4>
			<p class="modal__text">${pets[atribute].description}</p>
			<ul class="modal__list">
				<li class="modal__list-item"><span class="modal_text_bold">Age:</span> ${pets[atribute].age}</li>
				<li class="modal__list-item"><span class="modal_text_bold">Inoculations:</span> ${pets[atribute].inoculations}</li>
				<li class="modal__list-item"><span class="modal_text_bold">Diseases:</span> ${pets[atribute].diseases}</li>
				<li class="modal__list-item"><span class="modal_text_bold">Parasites:</span> ${pets[atribute].parasites}</li>
			</ul>
		</div>	
	`)
	MODAL.classList.add('visibility');

	MODAL_WINDOW.onmouseover = function () {
		MODAL_CLOSE_BTN.classList.remove('modal__close-btn_hover');
	}

	MODAL_WINDOW.onmouseout = function () {
		MODAL_CLOSE_BTN.classList.add('modal__close-btn_hover');
	}
}

function closeModal() {
	MODAL.classList.remove('visibility');
	MODAL_CONTENT_WRAPPER.innerHTML = '';
	DARKNESS.classList.remove('darkness-active');
	BODY.classList.remove('lock');
}

MODAL_CLOSE_BTN.addEventListener('click', function () {
	closeModal()
})

window.onclick = function (event) {
	if (event.target.classList.contains('modal')) {
		closeModal()
	}
}











