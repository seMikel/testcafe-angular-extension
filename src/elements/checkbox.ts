import { t } from "testcafe";
import { InstanceProvider, Check } from "./instance-provider";
import { BaseElement } from "./base";

export interface ACheckBox {
    selector: Selector;
    click(options?: ClickActionOptions): Promise<void>;
    check(options?: ClickActionOptions): Promise<void>;
    uncheck(options?: ClickActionOptions): Promise<void>;
    isChecked(): Promise<boolean| undefined>;
}

export class NativeCheckBox implements ACheckBox {
    constructor(public selector: Selector) { }

    async click(options?: ClickActionOptions) {
        return await t.click(this.selector, options);
    }
    async check(options?: ClickActionOptions) {
        if (await this.isChecked()) {
            return Promise.resolve();
        }
        return await this.click(options);
    }
    async uncheck(options?: ClickActionOptions) {
        if (await this.isChecked()) {
            return await this.click(options);
        }
        return Promise.resolve();
    }
    async isChecked() {
        return await this.selector.checked;
    }
}

export class CheckBox extends BaseElement<ACheckBox> implements ACheckBox {
    private static _instanceProvider = new InstanceProvider<ACheckBox>(NativeCheckBox);
    public static addCheck(check: Check<ACheckBox>) {
        CheckBox._instanceProvider.addEntityCheck(check);
    }

    protected get instanceProvider() {
        return CheckBox._instanceProvider;
    }

    async click(options?: ClickActionOptions) {
        return (await this.instance).click(options);
    }
    async check(options?: ClickActionOptions) {
        return (await this.instance).check(options);
    }
    async uncheck(options?: ClickActionOptions) {
        return (await this.instance).uncheck(options);
    }
    async isChecked() {
        return (await this.instance).isChecked();
    }
}