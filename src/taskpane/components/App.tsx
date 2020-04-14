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
import { insertField } from '../common/officeAPI';
import { buildField } from '../common/fieldBuilders';

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
        
    }

    // Used for 'restricted' inputs, i.e. where only certain characters cause an update in state
    // For now: allows numbers only, for the recordNo input. Can be expanded if other inputs have other restrictions.
    handleChangeNumbersOnly = (event: any, newValue: string): void  => {
        if (newValue.indexOf(' ') == -1 && !isNaN(Number(newValue))) {
            this.handleChange(event, newValue);
        }
    }

    handleChangeReplaceSpaces = (event: any, newValue: string): void  => {
        this.handleChange(event, replaceSpaces(newValue));
    }

    handleFieldChange = (event: any, newValue: IDropdownOption): void => {
        if (this.state.resetOnChange) {
            this.resetOptions()
        }

        this.handleChange(event, newValue);
    }

    handleChange = (event: any, newValue?: string | IDropdownOption | boolean | undefined): void => {
        let id = event.target.id;

        if (newValue !== undefined) {
            this.setState({
                [id]: newValue
            });
        }
    }

    resetOptions = () => this.setState(this.defaultOptions);

    resetConditional = () => this.setState(this.defaultConditional);

    insertFieldBtn = () => {
        const field = buildField(this.state);

        if (field) {
            insertField(this.state.useMailMergeFields, field, undefined);
        } else {
            // TODO: handle form errors
            console.log("Error");
        }
    }

    copyCondition1 = () => {

        let field = buildField(this.state);

        if (field) {
            this.setState({
                condition1: field.code,
                condition1IsField: true,
            })
        }
    }

    copyCondition2 = () => {
        let field = buildField(this.state);

        if (field) {
            this.setState({
                condition2: field.code,
                condition2IsField: true,
            })
        }
    }

    insertRepeatBtn = () => {

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
                        resetOptions={this.resetOptions}
                        copyCondition1={this.copyCondition1}
                        copyCondition2={this.copyCondition2} />
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
                        resetConditional={this.resetConditional}  />
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