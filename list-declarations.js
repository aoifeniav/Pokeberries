function nextListPage(list) {
    const arrowRight = document.querySelector('.arrow--right');
    const berryListDivs = document.querySelectorAll('.card-up__item div:last-child');
    const berryListIconsDivs = document.querySelectorAll('.berry-sprite');
    const loaderUp = document.getElementById('loader-up');

    arrowRight.onclick = async function () {
        deleteDivContent(berryListDivs);
        deleteDivContent(berryListIconsDivs);
        loaderUp.classList.remove('display-none');
        if (list.next == null) {
            await getBerriesList();
        } else {
            await getBerriesList(list.next);
        }
        loaderUp.classList.add('display-none');
        printLeftArrow();
    };
}

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
    const loaderUp = document.getElementById('loader-up');

    arrowLeft.onclick = async function () {
        deleteDivContent(berryListDivs);
        deleteDivContent(berryListIconsDivs);
        loaderUp.classList.remove('display-none');
        if (list.previous == null) {
            await getBerriesList('https://pokeapi.co/api/v2/berry/?offset=60&limit=10');
        } else {
            await getBerriesList(list.previous);
        }
        loaderUp.classList.add('display-none');
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
