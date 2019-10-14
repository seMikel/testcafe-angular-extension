export type Check<T> = (selector: Selector) => Promise<{ new(selector: Selector): T } | void>;

export class InstanceProvider<T> {

    private checks: Check<T>[] = [];

    constructor(private def: { new(selector: Selector): T }) { }

    addEntityCheck(check: Check<T>) {
        this.checks.push(check);
    }

    async getInstance(target: Selector): Promise<T> {
        for (let i = 0; i < this.checks.length; i++) {
            const entityClass = await this.checks[i](target).catch(() => false);
            if (entityClass && typeof entityClass !== 'boolean') {
                return new entityClass(target);
            }
        }
        return new this.def(target);
    }
}
