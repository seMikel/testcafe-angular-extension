import { AMultiSelect } from '../../src/elements/multi-select';
import { t, Selector } from 'testcafe';

class DxTagBox implements AMultiSelect {
    private async getPopup() {
        return Selector(`#${await this.selector.withAttribute('aria-owns').getAttribute('aria-owns')}`);
    }
    
    constructor(public selector: Selector) { }

    async select(text: string, preserve = true) {
        if (!preserve) {
            await this.deselectAll();
        }
        await t.click(this.selector.find('.dx-texteditor-input-container'));
        await t.click((await this.getPopup()).find('.dx-item-content').withExactText(text));
    }

    async getSelection() {
        const tags = this.selector.find('.dx-tag');
        const tagsCount = await tags.count;
        const selection = [];
        for (let i = 0; i < tagsCount; i++) {
            selection.push(await tags.nth(i).textContent)
        }
        return selection;
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

    async deselect(...options: string[]) {
        const tags = this.selector.find('.dx-tag').filter((tag) => options.indexOf(tag.textContent) !== -1);
        const tagsCount = await tags.count;
        const deselection = [];
        for (let i = 0; i < tagsCount; i++) {
            deselection.push(await t.click(tags.nth(i).find('.dx-tag-remove-button')));
        }
        return await Promise.all(deselection).then(() => undefined);
    }

    async deselectAll() {
        const clear = this.selector.find('.dx-clear-button-area > span');
        return clear.exists.then(hasClear => hasClear ? t.click(clear) : Promise.resolve());
    }
}

export const DxTagBoxCheck = (selector: Selector) => selector.tagName.then(tag => {
    if (tag === 'dx-tag-box') {
        return DxTagBox;
    }
})
