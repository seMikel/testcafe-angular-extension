# testcafe-angular-extension

This small extension for [TestCafe](https://github.com/DevExpress/testcafe/) provides a class for implementing a Page Object Model hierarchy as well as an extended selector for retrieving Angular component instances.

## Install

```sh
npm install testcafe-angular-extension
```

## Usage

Simply import and extend the Page class on you Page Object Models and it will provide you with the methods to select elements within its descendants.

To create page object hierarchies and custom elements either extend the Page class or create your own class which takes a Selector as a constructor and initialize it with the extendedSelector method.

## Examples

```js
import { Page, t } from 'testcafe-angular-extension';

class LoginPage extends Page {
    welcomeMessage = this.selector('h1');
    email = this.extendedSelector(TextInput, '#email');
    password = this.extendedSelector(TextInput, '#password');
}

class CustomTextInput {

    public readonly input: Selector;

    constructor(private _selector: Selector) {
        this.input = this._selector.find('input');
    }

    public async type(text: string) {
        await t.typeText(this.input, text);
    }

    public async replace(text: string) {
        await t.selectText(this.input).typeText(this.input, text);
    }

    public async clear() {
        await t.selectText(this.input).pressKey('delete');
    }

    public async getText() {
        await this.input.value;
    }
}

```

For Angular applications make sure that the application has been bootstraped before the test begins.

```js
import { awaitAngularLoad } from 'testcafe-angular-extension';

fixture `App Test`.page('http://localhost:4200')
    .beforeEach(async () => {
        await awaitAngularLoad();
    });
	
```
