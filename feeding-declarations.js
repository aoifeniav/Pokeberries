function displayReactions(reactionName) {
    const element = document.querySelector(`.${reactionName}`);
    element.classList.remove('display-none');
    setTimeout(() => {
        element.classList.add('display-none');
    }, 1000);
}

function flavorConditions() {
    const spicyValue = document.getElementById('spicy-value').innerText;
    const dryValue = document.getElementById('dry-value').innerText;
    const sweetValue = document.getElementById('sweet-value').innerText;
    const bitterValue = document.getElementById('bitter-value').innerText;
    const sourValue = document.getElementById('sour-value').innerText;
    const flavorsList = [Number.parseInt(spicyValue), Number.parseInt(dryValue), Number.parseInt(sweetValue), Number.parseInt(bitterValue), Number.parseInt(sourValue)];

    const firstMaxValue = Math.max(...flavorsList);
    if (firstMaxValue === flavorsList[0] && flavorsList.lastIndexOf(firstMaxValue) === 0) {
        displayReactions('rays');
    } else if (firstMaxValue === flavorsList[2] && flavorsList.lastIndexOf(firstMaxValue) === 2) {
        displayReactions('stars');
    } else {
        displayReactions('hearts');
    }
}
