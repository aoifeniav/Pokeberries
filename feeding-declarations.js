function displayReaction(reactionName) {
    const reactionImage = document.querySelector(`.${reactionName}`);
    reactionImage.classList.remove('display-none');
    setTimeout(() => {
        reactionImage.classList.add('display-none');
    }, 800);
}

function flavorConditions() {
    const spicyValue = document.getElementById('spicy-value').innerText;
    const dryValue = document.getElementById('dry-value').innerText;
    const sweetValue = document.getElementById('sweet-value').innerText;
    const bitterValue = document.getElementById('bitter-value').innerText;
    const sourValue = document.getElementById('sour-value').innerText;
    const flavorsList = [Number.parseInt(spicyValue), Number.parseInt(dryValue), Number.parseInt(sweetValue), Number.parseInt(bitterValue), Number.parseInt(sourValue)];

    const firstMaxValue = Math.max(...flavorsList);
    if (firstMaxValue === flavorsList[0] && flavorsList.indexOf(firstMaxValue) === flavorsList.lastIndexOf(firstMaxValue)) {
        displayReaction('rays');
    } else if (firstMaxValue === flavorsList[2] && flavorsList.indexOf(firstMaxValue) === flavorsList.lastIndexOf(firstMaxValue)) {
        displayReaction('stars');
    } else {
        displayReaction('hearts');
    }
}
