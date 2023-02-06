// import {person} from "./interface";

const baseUrl = 'https://legacy--api.herokuapp.com/api/v1/houses';
//Get some elements from html
const gryffindor = document.querySelector('#gryffindor') as HTMLImageElement;
const slytherin = document.querySelector('#slytherin') as HTMLImageElement;
const hufflepuff = document.querySelector('#hufflepuff') as HTMLImageElement;
const ravewnclaw = document.querySelector('#ravenclaw') as HTMLImageElement;
const noFavorite = document.querySelector('#noFavorite') as HTMLButtonElement;
const container = document.querySelector('.container') as HTMLDivElement;
let card = document.createElement('section');
container.append(card);

async function getHouseInfo(x:string){
    const response = await fetch(baseUrl+x);
    const data = await response.json();
    
    let houseName = document.createElement('h2');
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
    
    houseName.textContent = `${data.name}`;
    founder.textContent = `Founder: ${data.founder}`;
    animal.textContent = `Animal: ${data.animal}`;
    traits.textContent = `Traits: ${data.traits}`;
    element.textContent = `Element: ${data.element}`;
    colors.textContent = `Colors: ${data.colors}`;
    ghost.textContent = `Ghost: ${data.ghost}`;
    commonRoom.textContent = `Common Room: ${data.common_room}`;
    img.src = data.image_url;        
}

//Listner to the searchbutton so the user can choose their favorite house.
gryffindor.addEventListener('click', (e) => {
    e.preventDefault();
    container.innerHTML = '';  
    getHouseInfo('/1');
})

slytherin.addEventListener('click', (e) => {
    e.preventDefault();
    container.innerHTML = '';  
    getHouseInfo('/2');
})

hufflepuff.addEventListener('click', (e) => {
    e.preventDefault();
    container.innerHTML = '';  
    getHouseInfo('/3');
})

ravewnclaw.addEventListener('click', (e) => {
    e.preventDefault();
    container.innerHTML = '';  
    getHouseInfo('/4');
})

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

