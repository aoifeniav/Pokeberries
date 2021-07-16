// function getRandomNubmer(min, max) {
//     return Math.floor(
//         Math.random() * (max - min + 1) + min
//     );
// }

// const natures = [adamant, bashful, bold, brave, calm, careful, docile, gentle, hardy, hasty, impish, jolly, lax, lonely, mild, modest, naive, naughty, quiet, quirky, rash, relaxed, sassy, serious, timid];

// const feedButtonListener = () => {
//     const feedButton = document.querySelector('.button');
//     feedButton.addEventListener('click', function () {
//         feedSnorlax();
//     });
// }

function deleteDivContent(divList) {
    for (let div of divList) {
        div.innerHTML = '';
    }
}

function printLeftArrow() {
    const arrowLeft = document.querySelector('.arrow--left');
    arrowLeft.classList.remove('display-none');
}

function previousListPage(list) {
    const arrowLeft = document.querySelector('.arrow--left');
    const berryListDivs = document.querySelectorAll('.card-up__item div:last-child');
    const berryListIconsDivs = document.querySelectorAll('.berry-sprite');
    arrowLeft.onclick = function () {
        deleteDivContent(berryListDivs);
        deleteDivContent(berryListIconsDivs);
        if (list.previous == null) {
            getBerriesList('https://pokeapi.co/api/v2/berry/?offset=60&limit=10');
        } else {
            getBerriesList(list.previous);
        }
    };
}

function nextListPage(list) {
    const arrowRight = document.querySelector('.arrow--right');
    const berryListDivs = document.querySelectorAll('.card-up__item div:last-child');
    const berryListIconsDivs = document.querySelectorAll('.berry-sprite');
    arrowRight.onclick = function () {
        deleteDivContent(berryListDivs);
        deleteDivContent(berryListIconsDivs);
        if (list.next == null) {
            getBerriesList();
        } else {
            getBerriesList(list.next);
        }
        printLeftArrow();
    };
}

function printBerriesList(list) {
    const berryListDivs = document.querySelectorAll('.card-up__item div:last-child');
    for (let i = 0; i < list.results.length; i++) {
        berryListDivs[i].innerHTML = list.results[i].name;
        berryListDivs[i].setAttribute('data-url', list.results[i].url);
    }
}

function printBerriesListIcons(list) {
    const berryListIconsDivs = document.querySelectorAll('.berry-sprite');
    for (let i = 0; i < list.results.length; i++) {
        let berryListIcon = document.createElement('img');
        berryListIcon.setAttribute('src', `./sprites/${list.results[i].name}.webp`);
        berryListIcon.setAttribute('alt', `${list.results[i].name} berry`);
        berryListIconsDivs[i].appendChild(berryListIcon);
    }
}

function showBerryCard() {
    const berryCard = document.querySelector('.card-down__berry');
    berryCard.classList.remove('display-none');
}

function hideInstructions() {
    const instructionsCard = document.querySelector('.card-down__info');
    instructionsCard.classList.add('display-none');
}

function printBerryDetailsTitle(details) {
    const berryDetailsTitleDiv = document.querySelector('.card-down__title div:last-child');
    berryDetailsTitleDiv.innerText = details.name;
}

function printBerryDetailsIcon(details) {
    const berryDetailsIconDiv = document.querySelector('.card-down__title div:first-child');
    berryDetailsIconDiv.innerHTML = '';
    const berryDetailsIcon = document.createElement('img');
    berryDetailsIcon.setAttribute('src', `./sprites/${details.name}.webp`);
    berryDetailsIcon.setAttribute('alt', `${details.name} berry`);
    berryDetailsIconDiv.appendChild(berryDetailsIcon);
}

function printBerryDetailsBlock(details) {
    const firmnessDiv = document.getElementById('firmness-value');
    const spicyDiv = document.getElementById('spicy-value');
    const dryDiv = document.getElementById('dry-value');
    const sweetDiv = document.getElementById('sweet-value');
    const bitterDiv = document.getElementById('bitter-value');
    const sourDiv = document.getElementById('sour-value');
    const sizeDiv = document.getElementById('size-value');
    const typeDiv = document.getElementById('type-value');

    firmnessDiv.innerText = details.firmness.name;
    spicyDiv.innerText = details.flavors[0].potency;
    dryDiv.innerText = details.flavors[1].potency;
    sweetDiv.innerText = details.flavors[2].potency;
    bitterDiv.innerText = details.flavors[3].potency;
    sourDiv.innerText = details.flavors[4].potency;
    sizeDiv.innerText = `${details.size} mm`;
    typeDiv.innerText = details.natural_gift_type.name;
}

const getBerryDetails = async (url) => {
    try {
        const response = await fetch(url);
        const berryDetails = await response.json();
        printBerryDetailsTitle(berryDetails);
        printBerryDetailsIcon(berryDetails);
        printBerryDetailsBlock(berryDetails);
        hideInstructions();
        showBerryCard();
    }
    catch (error) {
        console.log("Oh, no! Couldn't get berry details.", error);
    }
}

function getDetails(clickedItem) {
    const clickedItemUrl = clickedItem.getAttribute('data-url');
    getBerryDetails(clickedItemUrl);

}

const berryItemFromListListener = () => {
    const berryItemFromList = document.querySelectorAll('.card-up__item div:last-child');
    for (let item of berryItemFromList) {
        item.addEventListener('click', function () {
            getDetails(item);
        });
    }
}

const getBerriesList = async (url = 'https://pokeapi.co/api/v2/berry/?limit=10') => {
    try {
        const response = await fetch(url);
        const berriesList = await response.json();
        printBerriesList(berriesList);
        printBerriesListIcons(berriesList);
        nextListPage(berriesList);
        previousListPage(berriesList);
    }
    catch (error) {
        console.log("Oh, no! Couldn't get berries list.", error);
    }
}

const init = () => {
    getBerriesList();
    berryItemFromListListener();
    // feedButtonListener();
}

window.onload = function () {
    init();
}
