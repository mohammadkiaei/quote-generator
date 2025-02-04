// import { localQuotes } from './quotes.js';

// const quoteContainer = document.getElementById('quote-container');
// const quoteText = document.getElementById('quote');
// const authorText = document.getElementById('author');
// const twitterBtn = document.getElementById('twitter');
// const newQuoteBtn = document.getElementById('new-quote');
// const loader = document.getElementById('loader');

// // Show Loading
// function loading() {
//     loader.hidden = false;
//     quoteContainer.hidden = true;
// }

// // Hide Loading
// function complete() {
//     quoteContainer.hidden = false;
//     loader.hidden = true;
// }

// //Show New Quote
// function newQuote() {
//     loading();

//     // if you get your quotes locally just need bellow code!
//      const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     //  Check if Author field is blank and replace it with 'Unknown'
//     if (!quote.author) {
//         authorText.textContent = 'Unknown';
//     } else {
//         authorText.textContent = quote.author;
//     }

//     //Check Quote length to determine styling
//     if (quote.text.length > 100) {
//         quoteText.classList.add('long-quote');
//     } else {
//         quoteText.classList.remove('long-quote');
//     }
//     // Set Quote, Hide Loader
//     quoteText.textContent = quote.text;
//     complete();
// }

// //Tweet Quote
// function tweetQuote() {
//     const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
//     window.open(twitterUrl, '_blank');
// }

// // Event Listeners
// newQuoteBtn.addEventListener('click', newQuote);
// twitterBtn.addEventListener('click', tweetQuote);

// Developed by Mohammad Kiaei


import localQuotes from './quotes.js';  // ✅ Ensure script runs as a module

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Ensure elements exist
if (!quoteContainer || !quoteText || !authorText || !twitterBtn || !newQuoteBtn || !loader) {
    console.error("One or more elements not found in the DOM.");
}

// Show Loading
function loading() {
    if (loader.hidden) {
        loader.hidden = false;
        quoteContainer.hidden = true;
    }
}

// Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    authorText.textContent = quote.author ? quote.author : 'Unknown';
    quoteText.classList.toggle('long-quote', quote.text.length > 100);
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API (if needed)
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        const apiQuotes = await response.json();
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        quoteText.textContent = quote.text;
        authorText.textContent = quote.author ? quote.author : 'Unknown';
        complete();
    } catch (error) {
        console.error("Failed to fetch quotes:", error);
        newQuote();  // Fallback to local quotes
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
newQuote();  // ✅ Only call this if using local quotes
// getQuotes();  // ✅ Uncomment if fetching from an API

// Developed by Mohammad Kiaei
