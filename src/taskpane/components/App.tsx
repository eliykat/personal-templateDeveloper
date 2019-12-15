import * as React from 'react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { FieldsTab } from './FieldsTab';
import { OptionsTab } from './OptionsTab';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ConditionalTab } from './ConditionalTab';
import { insertField } from '../../Helpers/officeAPI';
import { IFormState } from '../shared/sharedInterfaces';

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
            ignoreIfNull: false,
            repeatrn: false,
            prefix: "",
            suffix: "",

            // Options tab
            actionType: undefined,
            useMailMergeFields: false,
            resetOnChange: true,
            case: undefined,
            dateFormat: undefined,
            phoneFormat: undefined,
            newLine: undefined,
            currencyToWords: false,
            noCurrencySymbol: false,
            customOption: "",

            // Conditional tab
            condition1: "",
            condition1IsField: false,
            conditionalOperator: undefined,
            condition2: "",
            condition2IsField: false
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event: any, newValue?: string | IDropdownOption | boolean | undefined) {
        let id = event.target.id;

        if (newValue !== undefined) {
            this.setState({
                [id]: newValue
            });
        }
    }

    render() {
        return (
            <Pivot>
                <PivotItem headerText="Fields">
                    <FieldsTab handleChange={this.handleChange} insertField={insertField} formState={this.state} />
                </PivotItem>
                <PivotItem headerText="Options">
                    <OptionsTab handleChange={this.handleChange} insertField={insertField} formState={this.state} />
                </PivotItem>
                <PivotItem headerText="Conditional">
                    <ConditionalTab handleChange={this.handleChange} formState={this.state} />
                </PivotItem>
            </Pivot>
        )
    }
}