// Import stylesheets
//import './style.css';


const form: HTMLFormElement = document.querySelector('#defineform');
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  
form.onsubmit = async (event) => {
  event?.preventDefault();
  const formData = new FormData(form);

  console.log(formData);
  const text = formData.get('defineword') as string;
  console.log(text);
  //return false; // prevent reload

  try {
    const response = await fetch(url+text);  //check this
    
    if (!response.ok) {
      throw new Error('Request failed'+ response.status);
    }

    const data: ApiResponse[] = await response.json();
    console.log('Response: ', data)
    // add more
  
  } catch (error) {
    console.error('Oh no! ', error);
  }
};

interface ApiResponse {
  word: string;
  phonetics: Phonetic[];
  meanings: Definition[];
  license: {
    name: string;
    url: string;
  };
  sourceUrls: string[];
}

interface Phonetic {
  audio: string;
  text: string;
  sourceUrl?: string;
  license?: {
    name: string;
    url: string;
  };
}

interface Definition {
  partOfSpeech: string;
  definitions: {
    definition: string;
    synonyms: string[];
    antonyms: string[];
    example?: string;
  }[];
  synonyms: string[];
  antonyms: string[];
}


