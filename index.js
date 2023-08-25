"use strict";
// Import stylesheets
// import './style.css';
// Object.defineProperty(exports, "__esModule", { value: true });
var form = document.querySelector('#defineform');
var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
form.onsubmit = function (event) {
    event.preventDefault();
    var formData = new FormData(form);
    var text = formData.get('defineword');
    fetch("".concat(url).concat(text))
        .then(function (response) { return response.json(); })
        .then(function (data) {
        // Assuming the API response is an array of definitions for the word
        if (Array.isArray(data) && data.length > 0) {
            var firstDefinition = data[0];
            console.log('Word:', firstDefinition.word);
            console.log('Phonetic:', firstDefinition.phonetic);
            console.log('Meanings:', firstDefinition.meanings);
            document.getElementById("phonetic").innerHTML = data[0].phonetics[0].text;
            var searchedWord = document.getElementById('searchedWord');
            searchedWord.textContent = firstDefinition.word;
        }
        else {
            console.log('No definition found for the word.');
        }
    })
        .catch(function (error) {
        console.error('Oh no...:', error);
    });
};
