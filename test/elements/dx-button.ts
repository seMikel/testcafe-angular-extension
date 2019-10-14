import { NativeButton } from '../../src/elements/button';

class DxButton extends NativeButton {
    constructor(selector: Selector) {
        super(selector);
    }

    async getText() {
        return await this.selector.find('.dx-button-text').innerText;
    }
}

export const DxButonCheck = (selector: Selector) => selector.tagName.then(tag => {
    if (tag === 'dx-button') {
        return DxButton;
    }
})
