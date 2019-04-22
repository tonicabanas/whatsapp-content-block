function nodeInsertedCallback(event) {
    let elements = event.relatedNode.getElementsByClassName('message-in')
    Array.from(elements).map(element => modifyElement(element));
}

function modifyElement(element) {
    if (element.getAttribute("blocked") === "true")
        return;
    element.setAttribute("blocked", "true");
    if (element) {
        console.log(element);
        let media = Media.factory(element);
        if (media) {
            console.log(media);
            media.addHideButton();
            media.hideElement();
        }
    }
}

document.addEventListener('DOMNodeInserted', nodeInsertedCallback);

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
        var button = document.createElement('button');
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
            let elements = this.element.getElementsByClassName('_3v3PK');
            this.bodyElement = elements.length > 0 ? elements[0] : null;
        }
        return this.bodyElement;
    }

    static isImage(msgElement) {
        return false;
        let imgs = msgElement.getElementsByTagName('img');
        return Array.from(imgs).some(img => { return !img.className.includes('selectable-text'); });
    }

}

class Video extends Media {

    getBodyElement() {
        if (!this.bodyElement) {
            let elements = this.element.getElementsByClassName('video-thumb');
            this.bodyElement = elements.length > 0 ? elements[0] : null;
        }
        return this.bodyElement;
    }

    static isVideo(msgElement) {
        return msgElement.getElementsByClassName('video-thumb').length > 0;
    }
}