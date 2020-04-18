import { IFormState, IASField } from "./interfaces";
import { replaceSpaces } from "./miscFunctions";

export function buildField(formState: IFormState): IASField | void {

    let field: IASField = {
        label: formState.field.key,
        code: formState.field.key
    }

    if (formState.dataSource === undefined || formState.field === undefined) {
        console.log("Error: dataSource or field === undefined");
        return;
    }
    
    if (formState.dataSource.key == 'Participant Data' || formState.dataSource.key == 'Participant Data - System') {
            
        if (formState.case.key == "upper") {
            field.code += '|pt=' + formState.participantType.key.toUpperCase();
        } else if (formState.case.key == "lower") {
            field.code += '|pt=' + formState.participantType.key.toLowerCase();
        } else {
            // Title case is used by default for participants
            field.code += '|pt=' + formState.participantType.key;
        }

        field.label = formState.participantType.key + ' ' + field.label;
    }

    if (formState.ignoreIfNull) {
        field.code += "|ifnull=ignore";
    } else if (formState.ifNull) {
        field.code += "|ifnull=" + replaceSpaces(formState.ifNull);
    }

    if (formState.repeatrn) {
        field.code += "|rn=*";
    } else if (formState.recordNo) {
        field.code += "|rn=" + formState.recordNo;
    }

    if (formState.prefix) {
        field.code += "|prefix=" + replaceSpaces(formState.prefix);
    }

    if (formState.suffix) {
        field.code += "|suffix=" + replaceSpaces(formState.suffix);
    }

    if (formState.newLine.key != "na") {
        field.code += "|newline=" + formState.newLine.key;
    }

    if (formState.stripSpaces) {
        field.code += "|strip_spaces=T";
    }

    // Case option only applies if it is not participant data (capitalisation set in option) 
    // and if it is a string or date type (being the only types that can have alphabetic representation,
    // except for currency|fm=text, which is set via the option).
    if (formState.case.key != "na" && formState.dataSource.key != 'Participant Data' && formState.dataSource.key != 'Participant Data - System'
        && (formState.field.format == 's' || formState.field.format == 'd' )) {
            field.code += "|case=" + formState.case.key;
    }

    if ( formState.field.format == 'd' && formState.dateFormat.key != 'na') {
        field.code += "|fm=" + formState.dateFormat.key;
    } else if ( formState.field.format == 'p' && formState.phoneFormat.key != 'na') {
        field.code += "|fm=" + formState.phoneFormat.key;
    } else if ( formState.field.format == 'c') {
        // Set capitalisation
        if (formState.currencyToWords) {
            if (formState.case.key == "upper") {
                field.code += "|fm=TEXT";
            } else if (formState.case.key == "uclowerwords") {
                field.code += "|fm=Text";
            } else {
                field.code += "|fm=text";
            }               
        } else if (formState.noCurrencySymbol) {
            field.code += "|show_currency_symbol=F";
        }
    } 

    if (formState.customOption) {
        field.code += "|" + replaceSpaces(formState.customOption);
    }

    return(field);
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
    
    const field: IASField = {
        code: null,
        label: null
    };

    if (formState.dataSource.key == "Participant Data") {
        field.code = "*REPEAT|data_source=action_participant." + formState.participantType.key + "|*";
        field.label = "REPEAT: " + formState.participantType.key;
    }
    else if (formState.dataSource.key == "Sale/Purchase Line Item Data") {
        field.code = "*REPEAT|data_source=SP_LineItems|*";
        field.label = "REPEAT: SPLineItems";
    }
    else {
        field.code = "Error: data source is not compatible with REPEAT",
        field.label = "Error: data source is not compatible with REPEAT"
    }

    return field;
}

export function buildRepeatEnd(): IASField {

    const field: IASField = {
        code: '*REPEAT|END*',
        label: 'END REPEAT'
    };

    return field;
}
