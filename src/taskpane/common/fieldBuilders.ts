import { IFormState, IASField } from "./interfaces";
import { replaceSpaces } from "./miscFunctions";

export function buildField(formState: IFormState): IASField | void {

    const isCustomField = formState.dataSource.key == "Custom Data";
    const selectedFieldCode = isCustomField ? formState.customField : formState.field.key;

    let newField: IASField = {
        label: selectedFieldCode,
        code: selectedFieldCode
    }

    // TODO: consistent error checking on inputs
    if (formState.dataSource === undefined || (!isCustomField && formState.field === undefined)) {
        console.log("Error: dataSource or field === undefined");
        return;
    }
    
    if (formState.dataSource.key == 'Participant Data') {
            
        if (formState.case.key == "upper") {
            newField.code += '|pt=' + formState.participantType.key.toUpperCase();
        } else if (formState.case.key == "lower") {
            newField.code += '|pt=' + formState.participantType.key.toLowerCase();
        } else {
            // Title case is used by default for participants
            newField.code += '|pt=' + formState.participantType.key;
        }

        newField.label = formState.participantType.key + ' ' + newField.label;
    }

    if (formState.ignoreIfNull) {
        newField.code += "|ifnull=ignore";
    } else if (formState.ifNull) {
        newField.code += "|ifnull=" + replaceSpaces(formState.ifNull);
    }

    if (formState.repeatrn) {
        newField.code += "|rn=*";
    } else if (formState.recordNo) {
        newField.code += "|rn=" + formState.recordNo;
    }

    if (formState.prefix) {
        newField.code += "|prefix=" + replaceSpaces(formState.prefix);
    }

    if (formState.suffix) {
        newField.code += "|suffix=" + replaceSpaces(formState.suffix);
    }

    if (formState.newLine.key != "na") {
        newField.code += "|newline=" + formState.newLine.key;
    }

    if (formState.stripSpaces) {
        newField.code += "|strip_spaces=T";
    }

    // Case option only applies if it is not participant data (capitalisation set in option) 
    // and if it is a string or date type (being the only types that can have alphabetic representation,
    // except for currency|fm=text, which is set via the option).
    if (formState.case.key != "na" && formState.dataSource.key != 'Participant Data'
        && (isCustomField || formState.field.format == 's' || formState.field.format == 'd' )) {
            newField.code += "|case=" + formState.case.key;
    }

    if ( (isCustomField || formState.field.format == 'd') && formState.dateFormat.key != 'na') {
        newField.code += "|fm=" + formState.dateFormat.key;
    } else if ( (isCustomField || formState.field.format == 'p') && formState.phoneFormat.key != 'na') {
        newField.code += "|fm=" + formState.phoneFormat.key;
    } else if ( formState.field && formState.field.format == 'c') {
        // Set capitalisation
        if (formState.currencyToWords) {
            if (formState.case.key == "upper") {
                newField.code += "|fm=TEXT";
            } else if (formState.case.key == "uclowerwords") {
                newField.code += "|fm=Text";
            } else {
                newField.code += "|fm=text";
            }               
        } else if (formState.noCurrencySymbol) {
            newField.code += "|show_currency_symbol=F";
        }
    } 

    if (formState.customOption) {
        newField.code += "|" + replaceSpaces(formState.customOption);
    }

    return(newField);
}

export function buildIf(formState: IFormState, ifType: 'IF' | 'ELSEIF'): IASField {
    let condition1;
    let condition2;

    if (formState.condition1IsField)
        condition1 = "{" + formState.condition1 + "}";
    else
        condition1 = '"' + formState.condition1 + '"';

    if (formState.condition2IsField)
        condition2 = "{" + formState.condition2 + "}";
    else
        condition2 = '"' + formState.condition2 + '"';

    const ifField: IASField = {
        code: '*' + ifType + ' ' + condition1 + ' ' + formState.conditionalOperator.key + ' ' + condition2 + ' *',
        label: ifType + ' ' + condition1 + ' ' + formState.conditionalOperator.key + ' ' + condition2
    }

    return ifField;
}

export function buildElse(): IASField {

    let field: IASField = {
        label: 'ELSE',
        code: '*ELSE*'
    }

    return field;
}

export function buildEndIf(): IASField {

    let field: IASField = {
        label: 'ENDIF',
        code: '*ENDIF*'
    }

    return  field;
}

export function buildRepeat(formState: IFormState): IASField {
    
    const newField: IASField = {
        code: null,
        label: null
    };

    if (formState.dataSource.key == "Participant Data") {
        newField.code = "*REPEAT|data_source=action_participant." + formState.participantType.key + "|*";
        newField.label = "REPEAT: " + formState.participantType.key;
    }
    else if (formState.dataSource.key == "Sale/Purchase Line Item Data") {
        newField.code = "*REPEAT|data_source=SP_LineItems|*";
        newField.label = "REPEAT: SPLineItems";
    }
    else if (formState.dataSource.key == "Custom Data") {
        newField.code = "*REPEAT|data_source=" + formState.customField + "|*";
        newField.label = "REPEAT: " + formState.customField;
    }
    else {
        newField.code = "Error: data source is not compatible with REPEAT",
        newField.label = "Error: data source is not compatible with REPEAT"
    }

    return newField;
}

export function buildRepeatEnd(): IASField {

    const field: IASField = {
        code: '*REPEAT|END*',
        label: 'END REPEAT'
    };

    return field;
}
