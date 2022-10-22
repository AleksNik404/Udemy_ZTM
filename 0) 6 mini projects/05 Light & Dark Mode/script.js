const toogleSwitch = document.querySelector(`input[type="checkbox"]`);
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

function toggleDarkLightMode(isDark) {
    nav.style.backgroundColor = isDark ? "rgb(0, 0, 0, 0.5)" : "rgb(255, 255, 255, 0.5)";
    textBox.style.backgroundColor = isDark ? "rgb(255, 255, 255, 0.5)" : "rgb(0, 0, 0, 0.5)";
    toggleIcon.children[0].textContent = isDark ? "Dark Mode" : "Ligth Mode";
    toggleIcon.children[1].classList.replace(
        isDark ? "fa-sun" : "fa-moon",
        isDark ? "fa-moon" : "fa-sun"
    );
    isDark ? setSvgColor("dark") : setSvgColor("light");
}

function setSvgColor(theme) {
    image1.src = `img/undraw_proud_coder_${theme}.svg`;
    image2.src = `img/undraw_feeling_proud_${theme}.svg`;
    image3.src = `img/undraw_conceptual_idea_${theme}.svg`;
}

// Evenet listener
function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        toggleDarkLightMode(true);
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        toggleDarkLightMode(false);
    }
}

toogleSwitch.addEventListener("change", switchTheme);

// Check local Storage FOr theme

const currentTheme = localStorage.getItem("theme");

if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
    if (currentTheme === "dark") toogleSwitch.checked = true;
    toggleDarkLightMode(true);
}
