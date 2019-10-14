import { t } from "testcafe";
import { BaseElement } from "./base";
import { InstanceProvider, Check } from "./instance-provider";

export interface ATextInput {
    selector: Selector;
    type(text: string, options?: TypeActionOptions): Promise<void>;
    replace(text: string, options?: TypeActionOptions): Promise<void>;
    clear(): Promise<void>;
    getText(): Promise<string | undefined>;
}

export class NativeTextInput implements ATextInput {
    constructor(public selector: Selector) { }

    async type(text: string, options?: TypeActionOptions) {
        return await t.typeText(this.selector, text, options);
    }
    async replace(text: string, options?: TypeActionOptions): Promise<void> {
        return await t.selectText(this.selector).typeText(this.selector, text, options);
    }
    async clear(): Promise<void> {
        return await t.selectText(this.selector).pressKey('delete');
    }
    async getText(): Promise<string | undefined> {
        return await this.selector.value;
    }
}

export class TextInput extends BaseElement<ATextInput> implements ATextInput {
    private static _instanceProvider = new InstanceProvider<ATextInput>(NativeTextInput);
    public static addCheck(check: Check<ATextInput>) {
        TextInput._instanceProvider.addEntityCheck(check);
    }

    protected get instanceProvider() {
        return TextInput._instanceProvider;
    }

    async type(text: string, options?: TypeActionOptions) {
        return (await this.instance).type(text, options);
    }

    async replace(text: string, options?: TypeActionOptions) {
        return (await this.instance).replace(text, options);
    }

    async clear(): Promise<void> {
        return (await this.instance).clear();
    }

    async getText(): Promise<string | undefined> {
        return (await this.instance).getText();
    }
}
