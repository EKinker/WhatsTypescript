// Import stylesheets
// import './style.css';

import { Words } from './words';

const form: HTMLFormElement = document.querySelector('#defineform');
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

form.onsubmit = (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const text = formData.get('defineword') as string;

    fetch(`${url}${text}`)
      .then(response =>response.json())
      .then((data: Words[]) => {

    // Assuming the API response is an array of definitions for the word
    if (Array.isArray(data) && data.length > 0) {
      const firstDefinition = data[0];

      console.log('Word:', firstDefinition.word);
      console.log('Phonetic:', firstDefinition.phonetic);
      console.log('Meanings:', firstDefinition.meanings);
      document.getElementById("phonetic").innerHTML = data[0].phonetics[0].text;

      let searchedWord = document.getElementById('searchedWord');
      searchedWord.textContent = firstDefinition.word;
    } else {
      console.log('No definition found for the word.');
    }
      
  })
   .catch (error => {
    console.error('Oh no...:', error);
  })
};
