import { ASelect } from '../../src/elements/select';
import { t, Selector } from 'testcafe';

class DxSelect implements ASelect {
    private async getPopup() {
        return Selector(`#${await this.selector.withAttribute('aria-owns').getAttribute('aria-owns')}`);
    }
    
    constructor(public selector: Selector) { }

    async select(text: string) {
        await t.click(this.selector.find('.dx-texteditor-input'));
        await t.click((await this.getPopup()).find('.dx-item-content').withExactText(text));
    }

    async getSelection() {
        return await this.selector.find('.dx-texteditor-input').value;
    }

    async getOptions() {
        const optionSelector = (await this.getPopup()).find('.dx-item-content');
        const optionCount = await optionSelector.count;
        const options = [];
        for (let i = 0; i < optionCount; i++) {
            options.push(await optionSelector.nth(i).textContent)
        }
        return options;
    }
}

export const DxSelectCheck = (selector: Selector) => selector.tagName.then(tag => {
    if (tag === 'dx-select-box') {
        return DxSelect;
    }
})
