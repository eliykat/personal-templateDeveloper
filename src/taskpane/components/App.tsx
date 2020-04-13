import * as React from 'react';

import { FieldsTab } from './FieldsTab';
import { OptionsTab } from './OptionsTab';
import { ConditionalTab } from './ConditionalTab';
import { SettingsTab } from './SettingsTab';

import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { IFormState, IFieldsState, IOptionsState, IConditionalState, ISettingsState } from '../common/interfaces';
import { replaceSpaces } from '../common/miscFunctions';

import { defaultNewLine, defaultDateFormat, defaultCase, defaultPhoneFormat} from '../common/dropdownOptions';
import { buildFieldCode, insertField } from '../common/officeAPI';

export default class App extends React.Component {

    state: IFormState;
    defaultFields: IFieldsState;
    defaultOptions: IOptionsState;
    defaultConditional: IConditionalState;
    defaultSettings: ISettingsState;

    constructor(props: object) {
        super(props);

        this.defaultFields = {
            dataSource: undefined,
            participantType: undefined,
            dataCollection: undefined,
            field: undefined,
        }

        this.defaultOptions = {
            ifNull: "",
            ignoreIfNull: false,
            recordNo: "",
            repeatrn: false,
            prefix: "",
            suffix: "",
            case: defaultCase,
            newLine: defaultNewLine,
            currencyToWords: false,
            noCurrencySymbol: false,
            customOption: "",
            stripSpaces: false,
        }

        this.defaultConditional = {
            condition1: "",
            condition1IsField: false,
            conditionalOperator: undefined,
            condition2: "",
            condition2IsField: false,
        }

        this.defaultSettings = {
            useMailMergeFields: false,
            resetOnChange: true,
            dateFormat: defaultDateFormat,
            phoneFormat: defaultPhoneFormat
        }

        this.state = Object.assign({}, this.defaultFields, this.defaultOptions, this.defaultConditional, this.defaultSettings);
        
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeNumbersOnly = this.handleChangeNumbersOnly.bind(this);
        this.handleChangeReplaceSpaces = this.handleChangeReplaceSpaces.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.insertFieldBtn = this.insertFieldBtn.bind(this);
        this.insertConditionalBtn = this.insertConditionalBtn.bind(this);
        this.insertRepeatBtn = this.insertRepeatBtn.bind(this);
        this.resetOptions = this.resetOptions.bind(this);
        this.resetConditional = this.resetConditional.bind(this);
    }

    // Used for 'restricted' inputs, i.e. where only certain characters cause an update in state
    // For now: allows numbers only, for the recordNo input. Can be expanded if other inputs have other restrictions.
    handleChangeNumbersOnly(event: any, newValue: string): void {
        if (newValue.indexOf(' ') == -1 && !isNaN(Number(newValue))) {
            this.handleChange(event, newValue);
        }
    }

    handleChangeReplaceSpaces(event: any, newValue: string): void {
        this.handleChange(event, replaceSpaces(newValue));
    }

    handleFieldChange(event: any, newValue: IDropdownOption): void {
        if (this.state.resetOnChange) {
            this.resetOptions()
        }

        this.handleChange(event, newValue);
    }

    handleChange(event: any, newValue?: string | IDropdownOption | boolean | undefined): void {
        let id = event.target.id;

        if (newValue !== undefined) {
            this.setState({
                [id]: newValue
            });
        }
    }

    resetOptions(): void {
        this.setState(this.defaultOptions);
    }

    resetConditional(): void {
        this.setState(this.defaultConditional);
    }

    insertFieldBtn(): void {
                
        const field = buildFieldCode(this.state);

        if (field) {
            insertField(this.state.useMailMergeFields, field, undefined);
        } else {
            // TODO: handle form errors
            console.log("Error");
        }
    }

    insertConditionalBtn() {

    }

    insertRepeatBtn() {

    }

    render() {
        return (
            <Pivot>
                <PivotItem headerText="Fields">
                    <FieldsTab handleChange={this.handleChange} 
                        insertFieldBtn={this.insertFieldBtn} 
                        formState={this.state} 
                        handleChangeNumbersOnly={this.handleChangeNumbersOnly} 
                        handleChangeReplaceSpaces={this.handleChangeReplaceSpaces}
                        handleFieldChange={this.handleFieldChange}
                        resetOptions={this.resetOptions} />
                </PivotItem>
                <PivotItem headerText="Options">
                    <OptionsTab handleChange={this.handleChange} 
                        insertFieldBtn={this.insertFieldBtn} 
                        formState={this.state} 
                        handleChangeReplaceSpaces = {this.handleChangeReplaceSpaces} 
                        handleChangeNumbersOnly = {this.handleChangeNumbersOnly}
                        resetOptions={this.resetOptions} />
                </PivotItem>
                <PivotItem headerText="Conditional">
                    <ConditionalTab handleChange={this.handleChange} 
                        formState={this.state} 
                        insertConditionalBtn={this.insertConditionalBtn}
                        resetConditional={this.resetConditional} />
                </PivotItem>
                <PivotItem headerText="Settings">
                    <SettingsTab 
                    formState={this.state}
                    handleChange={this.handleChange} />
                </PivotItem>
            </Pivot>
        )
    }
}