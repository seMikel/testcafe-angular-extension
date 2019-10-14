import { awaitAngularLoad } from "../../src";
import TestPage from '../poms/test-page.pom';
import { registerDxElements } from "../elements/elements.provider";

fixture('Test').before(registerDxElements).page('http://localhost:4200').beforeEach( async t => {
    await awaitAngularLoad();
});

test('Test page', async t => {
    await TestPage.dxInput.type('DX Input');
    await TestPage.input.type('Native Input');

    await TestPage.dxButton.click();
    await TestPage.button.click();

    await TestPage.dxCheckBox.check();
    await TestPage.checkBox.check();

    await TestPage.dxSelect.select('Two');
    await TestPage.select.select('Three');

    await t.debug();
});
