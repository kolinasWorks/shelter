'use strict';

const BODY = document.querySelector('.body');
const HEADER = document.querySelector('.header');
const NAV_BURGER = HEADER.querySelector('.nav__burger');
const HEADER_NAV = HEADER.querySelector('.header__nav');
const HEADER_CONTAINER = HEADER.querySelector('.header__container');
const NAV_LIST = HEADER.querySelector('.nav__list');
const DARKNESS = document.querySelector('.darkness');
const MODAL = document.querySelector('.modal');
const MODAL_WINDOW = MODAL.querySelector('.modal__window');
const MODAL_CLOSE_BTN = MODAL.querySelector('.modal__close-btn');
const MODAL_CONTENT_WRAPPER = MODAL.querySelector('.modal__content-wrapper');


NAV_BURGER.addEventListener('click', function () {
	HEADER.classList.toggle('header__absolute');
	HEADER_NAV.classList.toggle('open');
	DARKNESS.classList.toggle('darkness-active');
	NAV_BURGER.classList.toggle('opener');
	BODY.classList.toggle('lock');
	HEADER_CONTAINER.classList.toggle('header__container_open');
})

function closeMenu() {
	HEADER.classList.remove('header__absolute');
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

// Modal

const res = await fetch("../pets.json");
const pets = await res.json();

const FRIENDS_SLIDER = document.querySelector('.friends__list');


FRIENDS_SLIDER.addEventListener('click', function (event) {
	if (event.target.closest('.friends__item')) {
		let indexPets = event.target.closest('.friends__item').dataset.modalBtn;
		getModalWindow(indexPets)
		DARKNESS.classList.toggle('darkness-active');
		BODY.classList.add('lock');
		HEADER.classList.toggle('header-down');
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
	HEADER.classList.remove('header-down');
}

MODAL_CLOSE_BTN.addEventListener('click', function () {
	closeModal()
})

window.onclick = function (event) {
	if (event.target.classList.contains('modal')) {
		closeModal()
	}
}

// Pagination

const FIRST_BTN = document.querySelector('.first-btn');
const PREV_BTN = document.querySelector('.prev-btn');
const CURRENT_BTN = document.querySelector('.current-btn');
const NEXT_BTN = document.querySelector('.next-btn');
const LAST_BTN = document.querySelector('.last-btn');


function getRandomPets() {
	const resultArray = [];
	let helperArray = [...pets];
	while (helperArray.length != 0) {
		let index = Math.floor(Math.random() * helperArray.length);
		resultArray.push(...helperArray.splice(index, 1));
	}
	return resultArray;
}

const createCardTemplate = (pet) => {
	const card = document.createElement('li');
	card.classList.add('friends__item');
	card.setAttribute("data-modal-btn", `${pet.atribute}`);
	card.innerHTML = `
			<img class="friends__img" src="${pet.img}" alt="${pet.type + ' ' + pet.name}" width="270" height="270">
			<span class="friends__pet-name">${pet.name}</span>
			<button class="btn btn__button">Learn more</button>
		`;

	return card;
}

let currentPage = 1;
let lastPage = 6;
let numberOfCardsPerPage = 8;

let windowWidth = document.documentElement.clientWidth;

let petsArray = [];
if (windowWidth >= 1280) {

	FRIENDS_SLIDER.innerHTML = '';
	for (let i = 0; i < 6; i++) {
		petsArray.push(getRandomPets());
	}
	// 
	for (let i = 0; i < numberOfCardsPerPage; i++) {
		const currentPet = petsArray[0][i];
		const card = createCardTemplate(currentPet);
		FRIENDS_SLIDER.append(card);
	}

} else if (windowWidth < 1280 && windowWidth >= 768) {

	lastPage = 8;
	numberOfCardsPerPage = 6;
	let allPetsArray = [];
	const oneSetPets = getRandomPets();
	for (let i = 0; i < 6; i++) {
		allPetsArray.push(...oneSetPets);
	}

	for (let i = 0; i < 8; i++) {
		petsArray.push(allPetsArray.splice(0, 6));
	}
	console.log(petsArray);

	FRIENDS_SLIDER.innerHTML = '';

	for (let i = 0; i < numberOfCardsPerPage; i++) {
		const currentPet = petsArray[0][i];
		const card = createCardTemplate(currentPet);
		FRIENDS_SLIDER.append(card);
	}

} else if (windowWidth < 768) {

	lastPage = 16;
	numberOfCardsPerPage = 3;
	let allPetsArray = [];
	const oneSetPets = getRandomPets();
	for (let i = 0; i < 6; i++) {
		allPetsArray.push(...oneSetPets);
	}

	for (let i = 0; i < 16; i++) {
		petsArray.push(allPetsArray.splice(0, 3));
	}
	console.log(petsArray);

	FRIENDS_SLIDER.innerHTML = '';

	for (let i = 0; i < numberOfCardsPerPage; i++) {
		const currentPet = petsArray[0][i];
		const card = createCardTemplate(currentPet);
		FRIENDS_SLIDER.append(card);
	}
}

FIRST_BTN.addEventListener('click', function (event) {
	if (event.target.classList.contains('pagination__btn_disabled')) {
		return false;
	}
	FRIENDS_SLIDER.classList.add('leaf-slider-first');
})

PREV_BTN.addEventListener('click', function (event) {
	if (event.target.classList.contains('pagination__btn_disabled')) {
		return false;
	}
	FRIENDS_SLIDER.classList.add('leaf-slider-prev');
})

NEXT_BTN.addEventListener('click', function (event) {
	if (event.target.classList.contains('pagination__btn_disabled')) {
		return false;
	}
	FRIENDS_SLIDER.classList.add('leaf-slider-next');
})

LAST_BTN.addEventListener('click', function (event) {
	if (event.target.classList.contains('pagination__btn_disabled')) {
		return false;
	}
	FRIENDS_SLIDER.classList.add('leaf-slider-last');
})

FRIENDS_SLIDER.addEventListener('animationend', function (event) {
	if (event.animationName === 'leafSliderNext') {
		FRIENDS_SLIDER.classList.remove('leaf-slider-next');
		FRIENDS_SLIDER.innerHTML = '';

		for (let i = 0; i < numberOfCardsPerPage; i++) {
			const currentPet = petsArray[currentPage][i];
			const card = createCardTemplate(currentPet);
			FRIENDS_SLIDER.append(card);
		}

		currentPage++;

		CURRENT_BTN.textContent = currentPage;

		FIRST_BTN.classList.remove('pagination__btn_disabled');
		PREV_BTN.classList.remove('pagination__btn_disabled');
		if (currentPage === lastPage) {
			NEXT_BTN.classList.add('pagination__btn_disabled');
			LAST_BTN.classList.add('pagination__btn_disabled');
		}
	} else if (event.animationName === 'leafSliderPrev') {
		FRIENDS_SLIDER.classList.remove('leaf-slider-prev');
		FRIENDS_SLIDER.innerHTML = '';

		for (let i = 0; i < numberOfCardsPerPage; i++) {
			const currentPet = petsArray[currentPage - 2][i];
			const card = createCardTemplate(currentPet);
			FRIENDS_SLIDER.append(card);
		}

		currentPage--;

		CURRENT_BTN.textContent = currentPage;

		NEXT_BTN.classList.remove('pagination__btn_disabled');
		LAST_BTN.classList.remove('pagination__btn_disabled');
		if (currentPage === 1) {
			PREV_BTN.classList.add('pagination__btn_disabled');
			FIRST_BTN.classList.add('pagination__btn_disabled');
		}
	} else if (event.animationName === 'leafSliderLast') {
		FRIENDS_SLIDER.classList.remove('leaf-slider-last');
		FRIENDS_SLIDER.innerHTML = '';

		for (let i = 0; i < numberOfCardsPerPage; i++) {
			const currentPet = petsArray[lastPage - 1][i];
			const card = createCardTemplate(currentPet);
			FRIENDS_SLIDER.append(card);
		}

		currentPage = lastPage;

		CURRENT_BTN.textContent = currentPage;

		LAST_BTN.classList.add('pagination__btn_disabled');
		NEXT_BTN.classList.add('pagination__btn_disabled');
		PREV_BTN.classList.remove('pagination__btn_disabled');
		FIRST_BTN.classList.remove('pagination__btn_disabled');
	} else if (event.animationName === 'leafSliderFirst') {
		FRIENDS_SLIDER.classList.remove('leaf-slider-first');
		FRIENDS_SLIDER.innerHTML = '';

		for (let i = 0; i < numberOfCardsPerPage; i++) {
			const currentPet = petsArray[0][i];
			const card = createCardTemplate(currentPet);
			FRIENDS_SLIDER.append(card);
		}

		currentPage = 1;

		CURRENT_BTN.textContent = currentPage;

		LAST_BTN.classList.remove('pagination__btn_disabled');
		NEXT_BTN.classList.remove('pagination__btn_disabled');
		PREV_BTN.classList.add('pagination__btn_disabled');
		FIRST_BTN.classList.add('pagination__btn_disabled');
	}
})

