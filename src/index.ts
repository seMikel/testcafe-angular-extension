import { Selector, ClientFunction } from 'testcafe';

export class Page {
    private _selector: Selector;

    constructor(_selector?: Selector) {
        if (_selector) {
            this._selector = _selector;
        } else {
            this._selector = Selector(() => <HTMLElement>(<any>window).getAllAngularRootElements()[0]);
        }
    }

    public get self() {
        return this._selector;
    }

    public selector(cssSelector: string, options?: SelectorOptions) {
        return Selector(this._selector, options).find(cssSelector);
    }

    public extendedSelector<T>(type: { new(selector: Selector): T ;}, cssSelector: string, options?: SelectorOptions) {
        return new type(Selector(this._selector, options).find(cssSelector));
    }

    public angularSelector<T>(cssSelector: string, options?: SelectorOptions) {
        return AngularSelector<T>(Selector(this._selector, options).find(cssSelector), options);
    }
}

export function AngularSelector<T>(init: string | ((...args: any[]) => Node | Node[] | NodeList | HTMLCollection) | Selector | NodeSnapshot | SelectorPromise, options?: SelectorOptions) {
    return <AngularSelector<T>>Selector(init, options).addCustomMethods({
        getComponent: (node) => {
            const debugElement = (<any>window).ng.probe(node);
            if (!debugElement) {
                throw new Error(`Target is not an Angular component`);
            }
            return debugElement.componentInstance;
        }
    });
}

interface AngularSelector<T> extends Selector {
    getComponent(): Promise<T>;
}

export const awaitAngularLoad = ClientFunction((time = 10000) => {

    const interval = 100;

    return new Promise((resolve, reject) => {

        let timer: NodeJS.Timer;
        let timeout: NodeJS.Timer;

        const isAngularLoaded = () => {
            return (<any>window).getAllAngularRootElements && (<any>window).getAllAngularRootElements()[0];
        };

        const stop = () => {
            clearTimeout(timeout);
            clearInterval(timer);
        };

        const check = () => {
            if (isAngularLoaded()) {
                stop();
                resolve();
            }
        };

        timer = setInterval(check, interval);
        timeout = setTimeout(() => {
            stop();
            reject(new Error('No Angular development instance was found in the window'));
        }, time);
    });
});

export * from './elements';