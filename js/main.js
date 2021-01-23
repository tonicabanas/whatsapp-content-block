let GLOBAL_ENABLE_WCB = false;

document.addEventListener('DOMNodeInserted', function (event) {
    nodeInsertedCallback(event, GLOBAL_ENABLE_WCB);
});

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['enabled'], function (result) {
        GLOBAL_ENABLE_WCB = result['enabled'];
    });
});

function nodeInsertedCallback(event, enabled) {
    if (enabled) {
        let elements = event.relatedNode.getElementsByClassName('message-in');
        Array.from(elements).map(element => modifyElement(element));
    }
}

function modifyElement(element) {
    if (element.getAttribute("blocked") === "true")
        return;
    element.setAttribute("blocked", "true");
    if (element) {
        let media = Media.factory(element);
        if (media) {
            media.addHideButton();
            media.hideElement();
        }
    }
}

class Media {

    constructor(element) {
        this.element = element;
        this.bodyElement = null;
    }

    static factory(msgElement) {
        switch (true) {
            case Image.isImage(msgElement):
                return new Image(msgElement);
            case Video.isVideo(msgElement):
                return new Video(msgElement);
            default:
                return null;
        }
    }

    hideElement() {
        this.getBodyElement().style.display = 'none';
    }

    addHideButton() {
        this.getBodyElement().parentNode.appendChild(this.createButtonShowHideWidget());
    }

    createButtonShowHideWidget() {
        let button = document.createElement('button');
        button.innerHTML = 'Show';
        button.className = 'buttonHide';
        button.addEventListener('click', event => {
            this.getBodyElement().style.display = this.getBodyElement().style.display === 'none' ? '' : 'none';
            button.innerHTML = button.innerHTML === 'Hide' ? 'Show' : 'Hide';
        });
        return button;
    }
}

class Image extends Media {

    getBodyElement() {
        if (!this.bodyElement) {
            let elements = this.element.getElementsByClassName('_1mTER');
            this.bodyElement = elements.length > 0 ? elements[0] : null;
        }
        return this.bodyElement;
    }

    static isImage(msgElement) {
        return msgElement.getElementsByClassName('_1mTER').length > 0;
    }
}

class Video extends Media {

    getBodyElement() {
        if (!this.bodyElement) {
            let elements = this.element.getElementsByClassName('_2nJ1e');
            this.bodyElement = elements.length > 0 ? elements[0] : null;
        }
        return this.bodyElement;
    }

    static isVideo(msgElement) {
        return msgElement.getElementsByClassName('_2nJ1e').length > 0;
    }
}