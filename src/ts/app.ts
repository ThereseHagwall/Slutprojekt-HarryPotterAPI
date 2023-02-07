// import {person} from "./interface";

const baseUrl = 'https://legacy--api.herokuapp.com/api/v1/houses/';
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

