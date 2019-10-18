import TestPage from '../poms/test-page.pom';
import { registerDxElements } from "../elements/elements.provider";

fixture('Test').before(registerDxElements).page('http://localhost:8080/index.html');

test('Test page', async t => {
    await TestPage.dxInput.type('DX Input');
    await t.expect(await TestPage.dxInput.getText()).eql('DX Input');
    await TestPage.input.type('Native Input');
    await t.expect(await TestPage.input.getText()).eql('Native Input');

    await TestPage.dxButton.click();
    await t.expect(await TestPage.dxButton.getText()).eql('Dx Button');
    await TestPage.button.click();
    await t.expect(await TestPage.button.getText()).eql('Native Button');

    await TestPage.dxCheckBox.check();
    await t.expect(await TestPage.dxCheckBox.isChecked()).ok();
    await TestPage.checkBox.check();
    await t.expect(await TestPage.checkBox.isChecked()).ok();

    await TestPage.dxSelect.select('Two');
    await t.expect(await TestPage.dxSelect.getSelection()).eql('Two');
    await TestPage.select.select('Three');
    await t.expect(await TestPage.select.getSelection()).eql('Three');

    await TestPage.dxTagBox.select('Two');
    await TestPage.dxTagBox.select('Three', true);
    await t.expect(await TestPage.dxTagBox.getSelection()).contains('Two', 'Three');
});
