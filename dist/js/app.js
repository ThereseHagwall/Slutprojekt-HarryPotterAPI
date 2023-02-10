"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = 'https://legacy--api.herokuapp.com/api/v1/houses/';
const charUrl = 'https://hp-api.onrender.com/api/characters';
const spellUrl = 'https://hp-api.onrender.com/api/spells';
const body = document.querySelector('body');
const allImages = [...document.querySelectorAll('.images')];
const noFavorite = document.querySelector('#noFavorite');
const container = document.querySelector('.container');
const chooseYourFavo = document.querySelector('h2');
const card = document.createElement('section');
const charCard = document.createElement('section');
const spellCard = document.createElement('section');
const favoritesCard = document.createElement('section');
const loading = document.createElement("img");
loading.className = "loading";
loading.src = "loading.gif";
function getHouseInfo(x) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(baseUrl + x);
        const data = yield response.json();
        let houseName = document.createElement('h3');
        let founder = document.createElement('p');
        let animal = document.createElement('p');
        let traits = document.createElement('p');
        let element = document.createElement('p');
        let colors = document.createElement('p');
        let ghost = document.createElement('p');
        let commonRoom = document.createElement('p');
        let img = document.createElement('img');
        container.append(card);
        card.className = 'houseCardSection';
        card.append(houseName, founder, animal, traits, element, colors, ghost, commonRoom, img);
        houseName.innerHTML = `${data.name}`;
        founder.innerHTML = `Founder: ${data.founder}`;
        animal.innerHTML = `Animal: ${data.animal}`;
        traits.innerHTML = `Traits: ${data.traits}`;
        element.innerHTML = `Element: ${data.element}`;
        colors.innerHTML = `Colors: ${data.colors}`;
        ghost.innerHTML = `Ghost: ${data.ghost}`;
        commonRoom.innerHTML = `Common Room: ${data.common_room}`;
        img.src = data.image_url;
        getColor(x);
    });
}
function getColor(x) {
    if (x === 1) {
        gryffindorColor();
    }
    else if (x === 2) {
        slytherinColor();
    }
    else if (x === 3) {
        hufflepuffColor();
    }
    else if (x === 4) {
        ravenclawColor();
    }
}
function gryffindorColor() {
    card.style.backgroundColor = '#740001';
    card.style.border = '10px solid #d3a625';
    card.style.color = '#ffff';
    charCard.style.backgroundColor = '#740001';
    charCard.style.border = '10px solid #d3a625';
    charCard.style.color = '#ffff';
    spellCard.style.backgroundColor = '#740001';
    spellCard.style.border = '10px solid #d3a625';
    spellCard.style.color = '#ffff';
    favoritesCard.style.backgroundColor = '#740001';
    favoritesCard.style.border = '10px solid #d3a625';
    favoritesCard.style.color = '#ffff';
}
function slytherinColor() {
    card.style.backgroundColor = '#1a472a';
    card.style.border = '10px solid #aaaaaa';
    card.style.color = '#ffff';
    charCard.style.backgroundColor = '#1a472a';
    charCard.style.border = '10px solid #aaaaaa';
    charCard.style.color = '#ffff';
    spellCard.style.backgroundColor = '#1a472a';
    spellCard.style.border = '10px solid #aaaaaa';
    spellCard.style.color = '#ffff';
    favoritesCard.style.backgroundColor = '#1a472a';
    favoritesCard.style.border = '10px solid #aaaaaa';
    favoritesCard.style.color = '#ffff';
}
function hufflepuffColor() {
    card.style.backgroundColor = '#ecb939';
    card.style.border = '10px solid #372e29';
    card.style.color = '#372e29';
    charCard.style.backgroundColor = '#ecb939';
    charCard.style.border = '10px solid #372e29';
    charCard.style.color = '#372e29';
    spellCard.style.backgroundColor = '#ecb939';
    spellCard.style.border = '10px solid #372e29';
    spellCard.style.color = '#372e29';
    favoritesCard.style.backgroundColor = '#ecb939';
    favoritesCard.style.border = '10px solid #372e29';
    favoritesCard.style.color = '#372e29';
}
function ravenclawColor() {
    card.style.backgroundColor = '#0e1a40';
    card.style.border = '10px solid #946b2d';
    card.style.color = '#ffff';
    charCard.style.backgroundColor = '#0e1a40';
    charCard.style.border = '10px solid #946b2d';
    charCard.style.color = '#ffff';
    spellCard.style.backgroundColor = '#0e1a40';
    spellCard.style.border = '10px solid #946b2d';
    spellCard.style.color = '#ffff';
    favoritesCard.style.backgroundColor = '#0e1a40';
    favoritesCard.style.border = '10px solid #946b2d';
    favoritesCard.style.color = '#ffff';
}
const houseArr = [
    'Gryffindor',
    'Slytherin',
    'Hufflepuff',
    'Ravenclaw',
    'Hogwarts',
];
for (let i = 1; i < allImages.length; i++) {
    allImages[i].addEventListener('click', () => {
        const text = document.createElement('p');
        text.innerHTML = 'Change theme:';
        body.append(text);
        for (let i = 0; i < houseArr.length; i++) {
            const label = document.createElement('label');
            label.innerHTML = (`<input class="radiobuttons" type="radio" name="themes" value="${houseArr[i]}">${houseArr[i]}`);
            body.append(label);
        }
        container.innerHTML = '';
        chooseYourFavo.remove();
        getHouseInfo(i);
        getSpellInfo(6);
        getCharInfo(8);
        favoritesSection();
        console.log(themesRadio);
    });
}
let themesRadio = Array.from([...document.querySelectorAll('.radiobuttons')]);
themesRadio.forEach(radioButton => {
    radioButton.addEventListener('change', () => {
        console.log('changed');
    });
});
noFavorite.addEventListener('click', function (e) {
    e.preventDefault();
    container.innerHTML = '';
    chooseYourFavo.remove();
    const text = document.createElement('p');
    text.innerHTML = 'Change theme:';
    body.append(text);
    for (let i = 0; i < houseArr.length; i++) {
        const label = document.createElement('label');
        label.innerHTML = (`<input class="radiobutton" type="radio" name="themes" value="${houseArr[i]}">${houseArr[i]}`);
        body.append(label);
    }
    function getAllHouseInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 1; i < 5; i++) {
                const response = yield fetch(baseUrl + i);
                const data = yield response.json();
                container.append(card);
                const infoSec = document.createElement('section');
                let houseName = document.createElement('h3');
                let founder = document.createElement('p');
                let img = document.createElement('img');
                card.append(infoSec);
                infoSec.append(houseName, founder, img);
                houseName.textContent = `${data.name}`;
                founder.innerHTML = `Founder: ${data.founder}`;
                img.src = data.image_url;
                infoSec.className = 'houseCardSection';
                card.className = 'allHousesSection';
                card.style.backgroundColor = '#0e1a40';
                card.style.border = '10px solid #946b2d';
            }
        });
    }
    favoritesSection();
    getAllHouseInfo();
    getSpellInfo(6);
    getCharInfo(8);
});
function getCharInfo(x) {
    return __awaiter(this, void 0, void 0, function* () {
        charCard.innerHTML = '';
        const response = yield fetch(charUrl);
        const data = yield response.json();
        const charHeader = document.createElement('h3');
        const list = document.createElement('ul');
        const viewMore = document.createElement('p');
        viewMore.innerHTML = 'View All';
        viewMore.addEventListener('click', (e) => {
            e.preventDefault();
            container.innerHTML = '';
            getCharInfo(data.length);
        });
        charCard.className = 'charCard';
        charHeader.innerHTML = 'Characters';
        for (let i = 0; i < x; i++) {
            let charName = document.createElement('p');
            charName.innerHTML += `<li>${data[i].name}</li>`;
            list.append(charName);
            container.append(charCard);
            charCard.append(charHeader, list);
        }
        charCard.append(viewMore);
    });
}
function getSpellInfo(x) {
    return __awaiter(this, void 0, void 0, function* () {
        spellCard.innerHTML = '';
        const response = yield fetch(spellUrl);
        const data = yield response.json();
        const spellHeader = document.createElement('h3');
        const list = document.createElement('ul');
        const viewMore = document.createElement('p');
        viewMore.innerHTML = 'View All';
        spellCard.className = 'spellCard';
        spellHeader.innerHTML = 'Spells';
        for (let i = 0; i < x; i++) {
            let spellName = document.createElement('p');
            spellName.innerHTML += `<li>${data[i].name}</li> Description: ${data[i].description}`;
            list.append(spellName);
            spellCard.append(spellHeader, list);
            container.append(spellCard);
        }
        viewMore.addEventListener('click', (e) => {
            e.preventDefault();
            container.innerHTML = '';
            getSpellInfo(data.length);
        });
        spellCard.append(viewMore);
    });
}
function favoritesSection() {
    const favoriteHeader = document.createElement('h3');
    const list = document.createElement('ul');
    const favorite = document.createElement('p');
    container.append(favoritesCard);
    favoritesCard.append(list, favoriteHeader, favorite);
    favoritesCard.className = 'favoriteCard';
    favoriteHeader.innerHTML = 'Favorites';
    favorite.innerHTML = `Your favorites stores here`;
}
