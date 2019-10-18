import { Page } from "../../src";
import { TextInput } from "../../src/elements/text-input";
import { Button } from "../../src/elements/button";
import { CheckBox } from "../../src/elements/checkbox";
import { Select } from "../../src/elements/select";
import { MultiSelect } from "../../src/elements/multi-select";

class TestPage extends Page {
    dxInput = this.extendedSelector(TextInput, '#dx-input');
    input = this.extendedSelector(TextInput, '#native-input');
    dxButton = this.extendedSelector(Button, '#dx-button');
    button = this.extendedSelector(Button, '#native-button');
    dxCheckBox = this.extendedSelector(CheckBox, '#dx-checkbox');
    checkBox = this.extendedSelector(CheckBox, '#native-checkbox');
    dxSelect = this.extendedSelector(Select, '#dx-select');
    select = this.extendedSelector(Select, '#native-select');
    dxTagBox = this.extendedSelector(MultiSelect, '#dx-tagbox');
    multiSelect = this.extendedSelector(MultiSelect, '#multi-select');
}

export default new TestPage();