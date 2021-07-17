async function getDetails(clickedItem) {
    const clickedItemUrl = clickedItem.getAttribute('data-url');
    const loaderDown = document.getElementById('loader-down');
    loaderDown.classList.remove('display-none');
    await getBerryDetails(clickedItemUrl);
    loaderDown.classList.add('display-none');
}

async function getBerryDetails(url) {
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