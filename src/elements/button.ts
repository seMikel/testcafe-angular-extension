import { t } from "testcafe";
import { InstanceProvider, Check } from "./instance-provider";
import { BaseElement } from "./base";

export interface AButton {
    selector: Selector;
    click(options?: ClickActionOptions): Promise<void>;
    getText(): Promise<string | undefined>;
}

export class NativeButton implements AButton {
    constructor(public selector: Selector) { }

    async click(options?: ClickActionOptions) {
        return await t.click(this.selector, options);
    }
    async getText() {
        return await this.selector.innerText;
    }
}

export class Button extends BaseElement<AButton> implements AButton {
    private static _instanceProvider = new InstanceProvider<AButton>(NativeButton);
    public static addCheck(check: Check<AButton>) {
        Button._instanceProvider.addEntityCheck(check);
    }

    protected get instanceProvider() {
        return Button._instanceProvider;
    }

    async click(options?: ClickActionOptions) {
        return (await this.instance).click(options);
    }

    async getText(): Promise<string | undefined> {
        return (await this.instance).getText();
    }
}