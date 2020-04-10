import * as React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { FieldsTab } from './FieldsTab';
import { OptionsTab } from './OptionsTab';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ConditionalTab } from './ConditionalTab';
import { IFormState } from '../common/interfaces';
import { replaceSpaces } from '../common/miscFunctions';

import { defaultNewLine, defaultDateFormat, defaultCase, defaultPhoneFormat} from '../common/dropdownOptions';
import { buildFieldCode, insertField } from '../common/officeAPI';

export default class App extends React.Component {

    state: IFormState;

    constructor(props: object) {
        super(props);

        this.state = {
            // Fields tab
            dataSource: undefined,
            participantType: undefined,
            dataCollection: undefined,
            field: undefined,
            ifNull: "",
            ignoreIfNull: false,
            recordNo: "",
            repeatrn: false,
            prefix: "",
            suffix: "",

            // Options tab
            useMailMergeFields: false,
            resetOnChange: true,
            case: defaultCase,
            dateFormat: defaultDateFormat,
            phoneFormat: defaultPhoneFormat,
            newLine: defaultNewLine,
            currencyToWords: false,
            noCurrencySymbol: false,
            customOption: "",
            stripSpaces: false,

            // Conditional tab
            condition1: "",
            condition1IsField: false,
            conditionalOperator: undefined,
            condition2: "",
            condition2IsField: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeNumbersOnly = this.handleChangeNumbersOnly.bind(this);
        this.handleChangeReplaceSpaces = this.handleChangeReplaceSpaces.bind(this);
        this.insertFieldBtn = this.insertFieldBtn.bind(this);
        this.insertConditionalBtn = this.insertConditionalBtn.bind(this);
        this.insertRepeatBtn = this.insertRepeatBtn.bind(this);
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

    handleChange(event: any, newValue?: string | IDropdownOption | boolean | undefined): void {
        let id = event.target.id;

        if (newValue !== undefined) {
            this.setState({
                [id]: newValue
            });
        }
    }

    insertFieldBtn() {
                
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
                        handleChangeReplaceSpaces={this.handleChangeReplaceSpaces} />
                </PivotItem>
                <PivotItem headerText="Options">
                    <OptionsTab handleChange={this.handleChange} 
                        insertFieldBtn={this.insertFieldBtn} 
                        formState={this.state} 
                        handleChangeReplaceSpaces = {this.handleChangeReplaceSpaces} />
                </PivotItem>
                <PivotItem headerText="Conditional">
                    <ConditionalTab handleChange={this.handleChange} 
                        formState={this.state} 
                        insertConditionalBtn={this.insertConditionalBtn} />
                </PivotItem>
            </Pivot>
        )
    }
}