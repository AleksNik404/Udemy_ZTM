// https://motivational-quotes-react.netlify.app/
// https://type.fit/api/quotes

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function showLoadSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function removeLoadSpinner() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// GET quotes From API
function newQuote() {
    showLoadSpinner();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if author field is blank and replace ot with 'Unknown'
    if (!quote.author) authorText.textContent = "Unknown";
    else authorText.textContent = quote.author;

    //Check quote length to determien styling
    if (quote.text.length > 80) quoteText.classList.add("long-quote");
    else quoteText.classList.remove("long-quote");

    quoteText.textContent = quote.text;
    removeLoadSpinner();
}

// GET quotes From API
async function getQuotes() {
    showLoadSpinner();
    const apiUrl = "https://type.fit/api/quotes";

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();

        newQuote();
    } catch (err) {
        console.log(err);
    }
    removeLoadSpinner();
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

    window.open(twitterUrl, "_blank");
}

// Evenets Listeners
twitterBtn.addEventListener("click", tweetQuote);
newQuoteBtn.addEventListener("click", newQuote);

// On Load
getQuotes();
// complete();
// loading();
