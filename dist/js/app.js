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
const allCharUrl = 'https://hp-api.onrender.com/api/characters';
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
const hogwartsExpressImg = document.createElement('img');
const ul = document.createElement('ul');
const idGryffindor = 1;
const idSlytherin = 2;
const idHufflepuff = 3;
const idRavenclaw = 4;
const idHogwarts = 5;
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
        getColorTheme(x);
    });
}
function getColorTheme(x) {
    if (x === idGryffindor) {
        gryffindorColorTheme();
    }
    else if (x === idSlytherin) {
        slytherinColorTheme();
    }
    else if (x === idHufflepuff) {
        hufflepuffColorTheme();
    }
    else if (x === idRavenclaw) {
        ravenclawColorTheme();
    }
    else if (x === idHogwarts) {
        hogwartsColorTheme();
    }
}
function getClassName(x) {
    card.className = `houseCardSection ${x}`;
    charCard.className = `charCard ${x}`;
    spellCard.className = `spellCard ${x}`;
    favoritesCard.className = `favoriteCard ${x}`;
}
function gryffindorColorTheme() {
    getClassName('gryffindor');
}
function slytherinColorTheme() {
    getClassName('slytherin');
}
function hufflepuffColorTheme() {
    getClassName('hufflepuff');
}
function ravenclawColorTheme() {
    getClassName('ravenclaw');
}
function hogwartsColorTheme() {
    getClassName('hogwarts');
}
function getRadioButton() {
    let themesRadio = Array.from(document.querySelectorAll('.radiobuttons'));
    themesRadio.forEach(radioButton => {
        radioButton.addEventListener('change', () => {
            if (radioButton.getAttribute('value') === 'Gryffindor') {
                card.innerHTML = '';
                getHouseInfo(idGryffindor);
                gryffindorColorTheme();
            }
            else if (radioButton.getAttribute('value') === 'Slytherin') {
                card.innerHTML = '';
                getHouseInfo(idSlytherin);
                slytherinColorTheme();
            }
            else if (radioButton.getAttribute('value') === 'Hufflepuff') {
                card.innerHTML = '';
                getHouseInfo(idHufflepuff);
                hufflepuffColorTheme();
            }
            else if (radioButton.getAttribute('value') === 'Ravenclaw') {
                card.innerHTML = '';
                getHouseInfo(idRavenclaw);
                ravenclawColorTheme();
            }
            else if (radioButton.getAttribute('value') === 'Hogwarts') {
                card.innerHTML = '';
                hogwartsColorTheme();
                getAllHouseInfo();
            }
        });
    });
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
        container.innerHTML = '';
        const text = document.createElement('p');
        const radioSection = document.createElement('section');
        text.innerHTML = 'Change theme:';
        container.append(radioSection);
        radioSection.append(text);
        radioSection.className = 'radioSection';
        container.style.padding = '0';
        container.style.gap = '10px';
        noFavorite.remove();
        for (let i = 0; i < houseArr.length; i++) {
            const label = document.createElement('label');
            label.innerHTML = (`<input class="radiobuttons" type="radio" name="themes" value="${houseArr[i]}">${houseArr[i]}`);
            radioSection.append(label);
        }
        chooseYourFavo.remove();
        getRadioButton();
        getHouseInfo(i);
        getSpellInfo(6);
        getAllCharInfo(8);
        favoritesSection();
    });
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
noFavorite.addEventListener('click', function (e) {
    e.preventDefault();
    container.innerHTML = '';
    chooseYourFavo.remove();
    noFavorite.remove();
    const text = document.createElement('p');
    const radioSection = document.createElement('section');
    text.innerHTML = 'Change theme:';
    container.append(radioSection);
    radioSection.append(text);
    radioSection.className = 'radioSection';
    container.style.padding = '0';
    container.style.gap = '10px';
    getColorTheme(idHogwarts);
    for (let i = 0; i < houseArr.length; i++) {
        const label = document.createElement('label');
        label.innerHTML = (`<input class="radiobuttons" type="radio" name="themes" value="${houseArr[i]}">${houseArr[i]}`);
        radioSection.append(label);
    }
    getAllHouseInfo();
    getRadioButton();
    favoritesSection();
    getSpellInfo(6);
    getAllCharInfo(8);
});
let favArr = [];
function getAllCharInfo(x) {
    return __awaiter(this, void 0, void 0, function* () {
        charCard.innerHTML = '';
        const response = yield fetch(allCharUrl);
        const data = yield response.json();
        const charHeader = document.createElement('h3');
        const list = document.createElement('ul');
        const viewMore = document.createElement('p');
        viewMore.innerHTML = 'View All';
        viewMore.addEventListener('click', () => {
            charCard.innerHTML = "";
            getAllCharInfo(data.length);
            const label = document.createElement('label');
            const search = document.createElement('input');
            const searchButton = document.createElement('button');
            searchButton.id = 'searchButton';
            charCard.append(label, search, searchButton);
            label.innerHTML = 'Search';
            search.placeholder = "Ex. Harry Potter";
            searchButton.innerHTML = "Search";
            searchButton.addEventListener('click', () => {
                console.log(search.value);
                for (let i = 0; i < data.length; i++) {
                    if (data[i].name === search.value) {
                        console.log(data[i].name, data[i].house, data[i].gender, data[i].patronus);
                    }
                }
                search.value = "";
            });
        });
        charHeader.innerHTML = 'Characters';
        for (let i = 0; i < x; i++) {
            let charName = document.createElement('p');
            charName.innerHTML += `<li>${data[i].name}</li>`;
            list.append(charName);
            container.append(charCard);
            charCard.append(charHeader, list);
            function getCharInfo(x) {
                return __awaiter(this, void 0, void 0, function* () {
                    const response = yield fetch(allCharUrl);
                    const data = yield response.json();
                    const info = document.createElement('section');
                    const img = document.createElement('img');
                    const favButton = document.createElement('button');
                    favButton.innerHTML = 'Add to favorites';
                    info.className = 'Info hidden';
                    favButton.className = 'Info hidden';
                    img.className = 'Info hidden';
                    for (let i = 0; i < data.length; i++) {
                        if (x === data[i].name) {
                            charName.append(info, img, favButton);
                            info.innerHTML = `Actor: ${data[i].actor}<br>Gender: ${data[i].gender}<br>House: ${data[i].house}<br>Ancestry: ${data[i].ancestry}<br>Species: ${data[i].species}<br>Patronus: ${data[i].patronus}`;
                            img.src = data[i].image;
                            if (data[i].image === "") {
                                charName.removeChild(img);
                            }
                            favButton.addEventListener('click', () => {
                                let find = favArr.indexOf(data[i].name);
                                if (find !== -1) {
                                    alert('This Carachter are allready in your favorites.');
                                }
                                else {
                                    favArr.push(data[i].name);
                                    printFavorites();
                                }
                            });
                        }
                    }
                    charName.addEventListener('click', () => {
                        if (info.className === "Info") {
                            info.className = "Info hidden";
                            img.className = "Info hidden";
                            favButton.className = "Info hidden";
                        }
                        else {
                            info.className = "Info";
                            img.className = "Info";
                            favButton.className = "Info";
                        }
                    });
                });
            }
            getCharInfo(charName.innerText);
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
        spellHeader.innerHTML = 'Spells';
        for (let i = 0; i < x; i++) {
            let spellName = document.createElement('p');
            spellName.innerHTML += `<li>Name: ${data[i].name}</li> Description: ${data[i].description}`;
            list.append(spellName);
            spellCard.append(spellHeader, list);
            container.append(spellCard);
        }
        viewMore.addEventListener('click', () => {
            spellCard.innerHTML = '';
            getSpellInfo(data.length);
        });
        spellCard.append(viewMore);
    });
}
function favoritesSection() {
    const favoriteHeader = document.createElement('h3');
    container.append(favoritesCard);
    favoritesCard.append(favoriteHeader);
    favoriteHeader.innerHTML = 'Favorites';
}
function printFavorites() {
    const list = document.createElement('li');
    ul.append(list);
    favoritesCard.append(ul);
    favArr.forEach(element => {
        list.innerHTML = `${element} <button class="deleteButtons">Delete</button)`;
    });
    for (let i = 0; i < favArr.length; i++) {
        const currentChar = favArr[i];
        const deleteButton = [...document.querySelectorAll('.deleteButtons')];
        const deleteIndex = favArr.findIndex((charName) => charName === currentChar);
        deleteButton[i].addEventListener('click', () => {
            console.log('deleted');
            ul.removeChild(list);
            favArr.splice(deleteIndex, 1);
            console.log(favArr);
        });
    }
}
