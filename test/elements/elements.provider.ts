import { TextInput } from "../../src/elements/text-input";
import { DxTextInputCheck } from "./dx-text-input";
import { CheckBox } from "../../src/elements/checkbox";
import { Button } from "../../src/elements/button";
import { Select } from "../../src/elements/select";
import { DxCheckBoxCheck } from "./dx-checkbox";
import { DxButonCheck } from "./dx-button";
import { DxSelectCheck } from "./dx-select";

export async function registerDxElements() {
    TextInput.addCheck(DxTextInputCheck);
    CheckBox.addCheck(DxCheckBoxCheck);
    Button.addCheck(DxButonCheck);
    Select.addCheck(DxSelectCheck);
}
