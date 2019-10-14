import { NativeCheckBox } from '../../src/elements/checkbox';
import { t } from 'testcafe';

class DxCheckBox extends NativeCheckBox {
    constructor(selector: Selector) {
        super(selector);
    }

    async click(options?: ClickActionOptions) {
        await t.click(this.selector.find('.dx-checkbox-icon'), options);
    }

    async isChecked() {
        return await this.selector.hasClass('dx-checkbox-checked');
    }
}

export const DxCheckBoxCheck = (selector: Selector) => selector.tagName.then(tag => {
    if (tag === 'dx-check-box') {
        return DxCheckBox;
    }
})
