import { NativeTextInput } from '../../src/elements/text-input';

class DxTextInput extends NativeTextInput {
    constructor(selector: Selector) {
        super(selector);
        this.selector = selector.find('.dx-texteditor-input');
    }
}

export const DxTextInputCheck = (selector: Selector) => selector.tagName.then(tag => {
    if (tag === 'dx-text-box') {
        return DxTextInput;
    }
})
