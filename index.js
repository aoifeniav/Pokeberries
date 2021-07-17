function feedButtonListener() {
    const feedButton = document.querySelector('.button');
    feedButton.addEventListener('click', function () {
        flavorConditions();
    });
}

function berryItemFromListListener() {
    const berryItemFromList = document.querySelectorAll('.card-up__item div:last-child');
    for (let item of berryItemFromList) {
        item.addEventListener('click', function () {
            getDetails(item);
        });
    }
}

async function getBerriesList(url = 'https://pokeapi.co/api/v2/berry/?limit=10') {
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

function init() {
    getBerriesList();
    berryItemFromListListener();
    feedButtonListener();
}

window.onload = function () {
    init();
}
