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

    const charHeader = document.createElement('h3');
    const list = document.createElement('ul');
    const charCard = document.createElement('section');
    const more = document.createElement('p');
    more.innerHTML = 'View All';
    
    charCard.append(more);

    charCard.className = 'charCard';
    charHeader.innerHTML = 'Characters';
    
    for(let i = 0; i < 5; i++){
        let charName = document.createElement('p');
        charName.innerHTML += `<li>${data[i].name}</li>`;
        list.append(charName);
        container.append(charCard);
        charCard.append(list, charHeader);
    }
}

async function getSpellInfo(){
    const response = await fetch(spellUrl)
    const data = await response.json();

    const spellHeader = document.createElement('h3');
    const list = document.createElement('ul');
    const spellCard = document.createElement('section');
    const more = document.createElement('p');
    more.innerHTML = 'View All';

    spellCard.append(more);
    
    spellCard.className ='spellCard';
    spellHeader.innerHTML = 'Spells';
    
    for(let i = 0; i < 5; i++){
        let spellName = document.createElement('p');
        spellName.innerHTML += `<li>${data[i].name}</li> Description: ${data[i].description}`;
        
        list.append(spellName);
        spellCard.append(list, spellHeader);
        container.append(spellCard);
    }

}
