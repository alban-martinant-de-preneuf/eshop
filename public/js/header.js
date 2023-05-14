const headerButtons = document.querySelectorAll(".bottom_part button");
const mainContener = document.getElementById("main_contener");

async function fetchAndDisplayContent(page) {
    response = await fetch(page);
    content = await response.text();
    mainContener.innerHTML = content;
    console.log(page);
    window[page]();
}

headerButtons.forEach(button => {
    button.addEventListener('click', e => {
        fetchAndDisplayContent(e.target.id);
    })
});