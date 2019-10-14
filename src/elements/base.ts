import { InstanceProvider } from "./instance-provider";

export abstract class BaseElement<T> {
    constructor(public readonly selector: Selector){ };
    protected abstract get instanceProvider(): InstanceProvider<T>;
    protected get instance() {
        return this.instanceProvider.getInstance(this.selector)
    }
}
