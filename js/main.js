function nodeInsertedCallback(event) {
    let elements = event.relatedNode.getElementsByClassName('message-in')
    Array.from(elements).map(element => modifyElement(element));
}

function modifyElement(element) {
    if (element.getAttribute("blocked") === "true")
        return;
    element.setAttribute("blocked", "true");
    if (element) {
        if (isVideo(element) || isImage(element)) {
            element.parentNode.appendChild(createButtonShowHideWidget(element));
        }
    }
}


function createButtonShowHideWidget(element) {
    var button = document.createElement('button');
    button.innerHTML = 'Show';
    button.className = 'buttonHide';
    element.style.display = 'none';
    button.addEventListener('click', event => {
        element.style.display = element.style.display === 'none' ? '' : 'none';
        button.innerHTML = button.innerHTML === 'Hide' ? 'Show' : 'Hide';
    });
    return button;
}

function isVideo(element) {
    return element.getElementsByClassName('video-thumb').length > 0;
}

function isImage(element) {
    let imgs = element.getElementsByTagName('img');
    
    return Array.from(imgs).some(img => {console.log(img); return !img.className.includes('selectable-text'); });
}

document.addEventListener('DOMNodeInserted', nodeInsertedCallback);