class DictionaryApp {
    apiUrl

        async searchWord() {

        const wordInput = document.getElementById('wordInput');
        const resultDiv = document.getElementById('result');

        if (resultDiv) {
            const word = wordInput.value.trim();
//            console.log(`${this.apiUrl}${word}`)

            if (word === '') {
                resultDiv.innerHTML = '<p>Please enter a word.</p>';
                return;
            }

            try {
                // Fetch data from the dictionary API
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                const data = await response.json();

                // Displays the definition of the word
                if (Array.isArray(data) && data.length > 0) {
                    const definition = data[0].meanings[0].definitions[0].definition;
                    resultDiv.innerHTML = `<p><strong>${word}:</strong> ${definition}</p>`;
                } else {
                    resultDiv.innerHTML = '<p>No definition found.</p>';
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                resultDiv.innerHTML = '<p>An error occurred. Please try again later.</p>';
            }
        }
    }
}

// Initialize the Dictionary App
document.addEventListener('DOMContentLoaded', () => {
    const dictionaryApp = new DictionaryApp();
    const searchButton = document.getElementById('searchButton');
    const wordInput = document.getElementById('wordInput');

    searchButton.addEventListener('click', () => {
            dictionaryApp.searchWord();
    });
        // eventListener for ENTER KEY
    wordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the form from submitting
            dictionaryApp.searchWord();
            }
        });
    });
