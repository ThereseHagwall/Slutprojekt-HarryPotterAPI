// import {person} from "./interface";


//!ATT GÖRA!!!!!
//? Lägga till sökfunktion där användaren kan hitta en specifik karaktär eller en specifik trollformel. 
//* Favorit knapp för att lägga till sina favoriter i. 
//* Fixa radioknapparna så dem syns bättre, ligger över korten och ligger på rad inte i column.
//? Skapa en delete knapp i favoriteSectionen.
//? Fixa så att när du klickar på ett namn får du upp info om karaktären. Klickar man igen så försvinner infon.

//Url to fetch from
const baseUrl = 'https://legacy--api.herokuapp.com/api/v1/houses/';
const allCharUrl = 'https://hp-api.onrender.com/api/characters';
const spellUrl = 'https://hp-api.onrender.com/api/spells';

//Get some elements from html and create som elements
const body = document.querySelector('body') as HTMLBodyElement;
const allImages = [...document.querySelectorAll('.images')];
const noFavorite = document.querySelector('#noFavorite') as HTMLButtonElement;
const container = document.querySelector('.container') as HTMLDivElement;
const chooseYourFavo = document.querySelector('h2') as HTMLElement;
const card = document.createElement('section');
const charCard = document.createElement('section');
const spellCard = document.createElement('section');
const favoritesCard = document.createElement('section');

const idGryffindor = 1;
const idSlytherin = 2;
const idHufflepuff = 3;
const idRavenclaw = 4;
const idHogwarts = 5;

// const loading = document.createElement("img");
// loading.className = "loading";
// loading.src = "loading.gif";


//A function to fetch the information about the house the user choose.
async function getHouseInfo(x:number):Promise <void>{

    const response = await fetch(baseUrl+x);
    const data = await response.json();
    
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
}

function getColorTheme(x:number):void{
    if(x === idGryffindor){
        gryffindorColorTheme();
    }else if(x === idSlytherin){
        slytherinColorTheme();
    }else if(x === idHufflepuff){
        hufflepuffColorTheme();
    }else if(x === idRavenclaw){
        ravenclawColorTheme();
    }else if(x === idHogwarts){
        hogwartsColorTheme();
    }
}

function getClassName(x:string):void{
    card.className = `houseCardSection ${x}`;
    charCard.className = `charCard ${x}`;
    spellCard.className = `spellCard ${x}`;
    favoritesCard.className = `favoriteCard ${x}`;
}

function gryffindorColorTheme():void{
    getClassName('gryffindor');
}

function slytherinColorTheme():void{
    getClassName('slytherin');

}

function hufflepuffColorTheme():void{
    getClassName('hufflepuff');

}

function ravenclawColorTheme():void{
    getClassName('ravenclaw');
}

function hogwartsColorTheme():void{
    getClassName('hogwarts');
}

function getRadioButton():void{
    let themesRadio = Array.from(document.querySelectorAll('.radiobuttons'));
    
    themesRadio.forEach(radioButton => {
        radioButton.addEventListener('change', () => {
            if(radioButton.getAttribute('value') === 'Gryffindor'){
                card.innerHTML = '';
                getHouseInfo(idGryffindor);
                gryffindorColorTheme();
            }else if(radioButton.getAttribute('value') === 'Slytherin'){
                card.innerHTML = '';
                getHouseInfo(idSlytherin);
                slytherinColorTheme();
            }else if(radioButton.getAttribute('value') === 'Hufflepuff'){
                card.innerHTML = '';
                getHouseInfo(idHufflepuff);
                hufflepuffColorTheme();
            }else if(radioButton.getAttribute('value') === 'Ravenclaw'){
                card.innerHTML = '';
                getHouseInfo(idRavenclaw);
                ravenclawColorTheme();
            }else if(radioButton.getAttribute('value') === 'Hogwarts'){
                card.innerHTML = '';
                hogwartsColorTheme()
                getAllHouseInfo();
            }
    });
    });
}

//Array to store all housenames and Nohouse = hogwarts
const houseArr: string[] = [
    'Gryffindor',
    'Slytherin',
    'Hufflepuff',
    'Ravenclaw',
    'Hogwarts',
]

//Loop through all images to set a listner on everyone
for(let i = 1; i < allImages.length; i++) {
    allImages[i].addEventListener('click', () => {
        container.innerHTML = '';
        const text = document.createElement('p') as HTMLParagraphElement;
        const radioSection = document.createElement('section');
        text.innerHTML = 'Change theme:';
        container.append(radioSection);
        radioSection.append(text);
        radioSection.className = 'radioSection';
        
        container.style.padding = '0';
        container.style.gap = '10px'
        noFavorite.remove();

        //Loop through the array to create radiobuttons and put listner to everyone.
        for(let i = 0; i < houseArr.length; i++) {
            const label = document.createElement('label');
            label.innerHTML =  (`<input class="radiobuttons" type="radio" name="themes" value="${houseArr[i]}">${houseArr[i]}`);
            radioSection.append(label);
        }
        
        chooseYourFavo.remove();  
        getRadioButton();
        getHouseInfo(i);
        getSpellInfo(6);
        getAllCharInfo(8);
        favoritesSection();  

    })
}

//A function to fetch all housenames and images 
async function getAllHouseInfo():Promise <void>{
    for(let i = 1; i < 5; i++){

        const response = await fetch(baseUrl + i);
        const data = await response.json();
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
}

//A listner to No favorite Button.
noFavorite.addEventListener('click', function(e){
    e.preventDefault();
    container.innerHTML = '';  
    chooseYourFavo.remove();
    noFavorite.remove();
    const text = document.createElement('p') as HTMLParagraphElement;
    const radioSection = document.createElement('section');
    text.innerHTML = 'Change theme:';
    container.append(radioSection);
    radioSection.append(text);
    radioSection.className = 'radioSection';
    
    container.style.padding = '0';
    container.style.gap = '10px'
    getColorTheme(idHogwarts);
    
    //Loop through the array to create radiobuttons and put listner to everyone.
    for(let i = 0; i < houseArr.length; i++) {
        const label = document.createElement('label');
        label.innerHTML =  (`<input class="radiobuttons" type="radio" name="themes" value="${houseArr[i]}">${houseArr[i]}`);
        radioSection.append(label);
    }     
    
    getRadioButton()
    favoritesSection();
    getAllHouseInfo();
    getSpellInfo(6);
    getAllCharInfo(8);
})

let favArr: string[] = [];

//A function to fetch the information about characters
async function getAllCharInfo(x:number):Promise <void>{
    charCard.innerHTML = '';
    const response = await fetch(allCharUrl)
    const data = await response.json();
    const charHeader = document.createElement('h3');
    const list = document.createElement('ul');
    const viewMore = document.createElement('p');
    viewMore.innerHTML = 'View All';
    
    viewMore.addEventListener('click', () =>{
        container.innerHTML = '';
        getAllCharInfo(data.length);
    }) 

    charHeader.innerHTML = 'Characters';
    
    //Loop through 5 characters to write on the card
    for(let i = 0; i < x; i++){
        let charName = document.createElement('p');
        charName.innerHTML += `<li>${data[i].name}</li>`;
        list.append(charName);
        container.append(charCard);
        charCard.append(charHeader, list);
        
        charName.addEventListener('click', () =>{
            async function getCharInfo(x:string):Promise <void>{
                const response = await fetch(allCharUrl);
                const data = await response.json();
                const info = document.createElement('section');
                info.className = 'Info';
                const img = document.createElement('img');
                img.className = 'Info';
                const favButton = document.createElement('button');
                favButton.innerHTML = 'Add to favorites';
                favButton.className = 'Info';
                for(let i = 0; i < data.length; i++){
                    if(x === data[i].name){
                        charName.append(info, img, favButton);
                        info.innerHTML = `Actor: ${data[i].actor}<br>Gender: ${data[i].gender}<br>House: ${data[i].house}<br>Acestry: ${data[i].ancestry}<br>Species: ${data[i].species}<br>Patronus: ${data[i].patronus}`;
                        img.src = data[i].image;
                        if(data[i].image === ""){
                            charName.removeChild(img);
                        }
                        favButton.addEventListener('click', () =>{
                            let find = favArr.indexOf(data[i].name);
                            if(find !== -1){
                                alert('This Carachter are allredy in your favorites.')
                            }else{
                                
                                favArr.push(data[i].name);
                                printFavorites();
                            }
                        })
                        favArr = [];
                    }
                }
            }
            getCharInfo(charName.innerText);
        })
    }
    charCard.append(viewMore);
}

//A function to fetch the information about spells
async function getSpellInfo(x:number):Promise <void>{
    spellCard.innerHTML = '';
    const response = await fetch(spellUrl)
    const data = await response.json();
    const spellHeader = document.createElement('h3');
    const list = document.createElement('ul');
    const viewMore = document.createElement('p');
    viewMore.innerHTML = 'View All';
    
    spellHeader.innerHTML = 'Spells';
    
    //Loop through 5 spells to write on the card
    for(let i = 0; i < x; i++){
        let spellName = document.createElement('p');
        spellName.innerHTML += `<li>${data[i].name}</li> Description: ${data[i].description}`;
        
        list.append(spellName);
        spellCard.append(spellHeader, list);
        container.append(spellCard);
    }
    
    viewMore.addEventListener('click', (e) =>{
        e.preventDefault();
        container.innerHTML = '';
        getSpellInfo(data.length);
    })
    spellCard.append(viewMore);

}

function favoritesSection():void{
    const favoriteHeader = document.createElement('h3');
    container.append(favoritesCard);
    favoritesCard.append(favoriteHeader);
    favoriteHeader.innerHTML = 'Favorites';
}

function printFavorites():void{
    const list = document.createElement('ul');
    favoritesCard.append(list);

    favArr.forEach(element =>{
        list.innerHTML += `<li>${element} <button class="deleteButton">Delete</button)`;
    })
    const deleteButton = document.querySelector('.deleteButton') as HTMLButtonElement;
    deleteButton.addEventListener('click', () =>{
        console.log('deleted');
    })    
}
