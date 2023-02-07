// import {person} from "./interface";

//Url to fetch from
const baseUrl = 'https://legacy--api.herokuapp.com/api/v1/houses/';
const charUrl = 'https://hp-api.onrender.com/api/characters';
const spellUrl = 'https://hp-api.onrender.com/api/spells';

//Get some elements from html
const allImages = [...document.querySelectorAll('.images')];
const noFavorite = document.querySelector('#noFavorite') as HTMLButtonElement;
const container = document.querySelector('.container') as HTMLDivElement;
const card = document.createElement('section');
container.append(card);

async function getHouseInfo(x:number){
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
}

for(let i = 1; i < allImages.length; i++) {
    allImages[i].addEventListener('click', () => {
        container.innerHTML = '';  
        getHouseInfo(i);
        getSpellInfo();
        getCharInfo();
    })
}

noFavorite.addEventListener('click', function(e){
    e.preventDefault();
    container.innerHTML = '';  
    async function getAllHouseInfo(){
        const response = await fetch(`${baseUrl}`);
        const data = await response.json();
        
        for(let i = 0; i < data.length; i++){

            let houseName = document.createElement('h2');
            let img = document.createElement('img');
            
            container.append(card);
            card.append(houseName, img);
            
            houseName.textContent = `${data[i].name}`;
            img.src = data[i].image_url; 
        }       
    }
    getAllHouseInfo();
})

async function getCharInfo(){
    const response = await fetch(charUrl)
    const data = await response.json();

    for(let i = 0; i < data.length; i++){
        const charCard = document.createElement('section');
        let charName = document.createElement('h3');
        let img = document.createElement('img');

        charName.innerHTML = data[i].name;
        img.src = data[i].image;
        
        container.append(charCard);
        charCard.append(charName, img);
        
        if(data[i].image === ''){
            charCard.removeChild(img);
        }
    }

}

async function getSpellInfo(){
    const response = await fetch(spellUrl)
    const data = await response.json();

    console.log(data);
    const spellSection = document.createElement('section');
    container.append(spellSection);

    for(let i = 0; i < data.length; i++){
        let spellName = document.createElement('p');
        let spellInfo = document.createElement('p');

        spellName.innerHTML = data[i].name;
        spellInfo = data[i].description;

        spellSection.append(spellName, spellInfo);
    }

}
