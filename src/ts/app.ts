// import {person} from "./interface";

const baseUrl = 'https://legacy--api.herokuapp.com/api/v1/houses/'
const searchButton = document.getElementById('searchButton') as HTMLButtonElement;
const input = document.querySelector('input') as HTMLInputElement;

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    console.log("Clicked");
    async function getHouseInfo(){
        if(input.value === "Gryffindor"){
            input.value = "1";
        }else if(input.value === "Slytherin"){
            input.value = "2";
        }else if(input.value === "Hufflepuff"){
            input.value = "3";
        }else if(input.value === "Ravenclaw"){
            input.value = "4";
        }
        const response = await fetch(`${baseUrl}${input.value}`);
        const data = await response.json();
        console.log(data);
        return data;
    }
    getHouseInfo();
})
