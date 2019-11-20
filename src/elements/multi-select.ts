import { t } from "testcafe";
import { InstanceProvider, Check } from "./instance-provider";
import { BaseElement } from "./base";

export interface AMultiSelect {
    selector: Selector;
    select(text: string | number, preserve?: boolean): Promise<void>;
    getSelection(): Promise<string[] | undefined>;
    getOptions(): Promise<string[]>;
    deselect(...options: string[]): Promise<void>;
    deselectAll(): Promise<void>;
}

export class NativeMultiSelect implements AMultiSelect {
    constructor(public selector: Selector) { }

    async select(option: string | number, preserve = true) {
        const options = preserve ? { modifiers: { ctrl: true } } : {};
        const selector = typeof option === 'string' ? this.selector.child('option').withExactText(option) : this.selector.child('option').nth(option)
        return await t.click(selector, options);
    }
    async getSelection() {
        const selectedOptions = this.selector.find('option').filter((node) => {
            const option = node as HTMLOptionElement;
            if (option && option.selected) {
                return true;
            }
            return false;
        });
        const selectedOptionCount = await this.selector.childElementCount;
        const selection = [];
        for (let i = 0; i < selectedOptionCount; i++) {
            selection.push(await selectedOptions.nth(i).textContent)
        }
        return selection;
    }
    async getOptions() {
        const optionCount = await this.selector.childElementCount;
        const options = [];
        for (let i = 0; i < optionCount; i++) {
            options.push(await this.selector.child().nth(i).textContent)
        }
        return options;
    }
    async deselect(...options: string[]) {
        const selectedOptions = this.selector.find('option').filter((node) => {
            const option = node as HTMLOptionElement;
            if (option && option.selected && option.textContent && options.indexOf(option.textContent) !== -1) {
                return true;
            }
            return false;
        });
        const selectedOptionCount = await this.selector.childElementCount;
        const selection = [];
        for (let i = 0; i < selectedOptionCount; i++) {
            selection.push(t.click(selectedOptions.nth(i), { modifiers: { ctrl: true } }));
        }
        return Promise.all(selection).then(() => undefined);
    }
    async deselectAll() {
        const firstOption = this.selector.find('option').nth(0);
        return await firstOption.exists.then((hasOptions) => {
            if (hasOptions) {
                return t.click(this.selector.find('option').nth(0)).click(this.selector.find('option').nth(0));
            } else {
                return Promise.resolve();
            }
        })
    }
}

export class MultiSelect extends BaseElement<AMultiSelect> implements AMultiSelect {
    private static _instanceProvider = new InstanceProvider<AMultiSelect>(NativeMultiSelect);
    public static addCheck(check: Check<AMultiSelect>) {
        MultiSelect._instanceProvider.addEntityCheck(check);
    }

    protected get instanceProvider() {
        return MultiSelect._instanceProvider;
    }

    async select(option: string | number, preserve?: boolean) {
        return (await this.instance).select(option, preserve);
    }
    async getSelection() {
        return (await this.instance).getSelection();
    }
    async getOptions() {
        return (await this.instance).getOptions();
    }
    async deselect(...options: string[]) {
        return (await this.instance).deselect(...options);
    }
    async deselectAll() {
        return (await this.instance).deselectAll();
    }
}