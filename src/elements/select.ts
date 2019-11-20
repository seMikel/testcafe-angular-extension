import { t } from "testcafe";
import { InstanceProvider, Check } from "./instance-provider";
import { BaseElement } from "./base";

export interface ASelect {
    selector: Selector;
    select(option: string | number): Promise<void>;
    getSelection(): Promise<string | undefined>;
    getOptions(): Promise<string[]>;
}

export class NativeSelect implements ASelect {
    constructor(public selector: Selector) { }

    async select(option: string | number) {
        const selector = typeof option === 'string' ? this.selector.child().withExactText(option) : this.selector.child(option);
        return await t.click(this.selector).click(selector);
    }
    async getSelection() {
        return await this.selector.value;
    }
    async getOptions() {
        const optionCount = await this.selector.childElementCount;
        const options = [];
        for (let i = 0; i < optionCount; i++) {
            options.push(await this.selector.child().nth(i).textContent)
        }
        return options;
    }
}

export class Select extends BaseElement<ASelect> implements ASelect {
    private static _instanceProvider = new InstanceProvider<ASelect>(NativeSelect);
    public static addCheck(check: Check<ASelect>) {
        Select._instanceProvider.addEntityCheck(check);
    }

    protected get instanceProvider() {
        return Select._instanceProvider;
    }

    async select(option: string | number) {
        return (await this.instance).select(option);
    }
    async getSelection() {
        return (await this.instance).getSelection();
    }
    async getOptions() {
        return (await this.instance).getOptions();
    }
}