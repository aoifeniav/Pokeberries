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

function berryItemFromListListener() {
    const berryItemFromList = document.querySelectorAll('.card-up__item div:last-child');
    for (let item of berryItemFromList) {
        item.addEventListener('click', function () {
            getDetails(item);
        });
    }
}

async function getBerriesList (url = 'https://pokeapi.co/api/v2/berry/?limit=10') {
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
    // feedButtonListener();
}

window.onload = function () {
    init();
}
