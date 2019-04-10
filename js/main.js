const userNameToBlock = 'User Name'

function nodeInsertedCallback(event) {
    let elements = document.getElementsByClassName('_2a1Yw')
    Array.from(elements).map(element => modifyElement(element));
}

function modifyElement(element) {
    if (element.innerText === userNameToBlock) {
        getRootElement(element).className = 'hiddenElement';
    }
}

function getRootElement(element) {
    console.log(element.className);
    if (element.className.includes('message-in')) {
        return element;
    }
    return getRootElement(element.parentNode);
}

document.addEventListener('DOMNodeInserted', nodeInsertedCallback);