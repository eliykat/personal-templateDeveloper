import { IFormState } from "../taskpane/shared/sharedInterfaces";

interface IASField {
    code: string,
    label: string
}

export function insertField(useMailMergeFields: boolean, startField: IASField, endField: IASField | undefined) {
    if (useMailMergeFields) {
        insertMailMerge(startField, endField);
    }
    else {
        insertBracketField(startField, endField);
    }
}

export function buildFieldCode(formState: IFormState) {

    let field = {
        label: formState.field.key,
        code: formState.field.key
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

        field.label = formState.participantType + ' ' + field.label;
    }

    if (formState.ignoreIfNull) {
        field.code += "|ifnull=ignore";
    // } else if (state.ifNull) {
    //     field.code += "|ifnull=" + state.ifNull;
    }

    if (formState.repeatrn) {
        field.code += "|rn=*";
    // } else if (state.recordNo) {
    //     field.code += "|rn=" + state.recordNo;
    }

    if (formState.prefix) {
        field.code += "|prefix=" + formState.prefix.replace(/ /g, '_');
    }

    if (formState.suffix) {
        field.code += "|suffix=" + formState.suffix.replace(/ /g, '_');
    }

    if (formState.newLine.key != "na") {
        field.code += "|newline=" + formState.newLine.key;
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
        field.code += "|" + formState.customOption.replace(/ /g, '_');
    }

    return(field);
}

function insertBracketField(startField: IASField, endField: IASField | undefined) {
    Word.run( (context) => {

        var range = context.document.getSelection();

        if (endField === undefined) {
            range.insertText("[[" + startField.code + "]]", "Replace");
        }
        else {
            range.insertText("[[" + startField.code + "]]", "Before");
            range.insertText("[[" + endField.code + "]]", "After");
        }

        return context.sync();
    }); //.catch(errorhandler);
}

function insertMailMerge(startField: IASField, endField: IASField | undefined) {

    let startXML, endXML;

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = () => {
        if (this.readyState == 4 && this.status == 200) {

            startXML = xhr.responseText;
            endXML = xhr.responseText;
            
            // Replace field code and field text for startXML
            startXML = startXML.replace('FIELD_CODE', startField.code);
            startXML = startXML.replace('FIELD_TEXT', startField.label);
    
            Word.run( (context) => {
    
                const range = context.document.getSelection();
    
                if (endField === undefined) {
                    range.insertOoxml(startXML, "Replace");
                } else {
                    endXML = endXML.replace('FIELD_CODE', endField.code);
                    endXML = endXML.replace('FIELD_TEXT', endField.label);
    
                    range.insertOoxml(startXML, "Before");
                    range.insertOoxml(endXML, "After");
                }
    
                return context.sync().then(() => {
                    console.log('Sync success');
                });
            }); //.catch(errorHandler);
        }
    };

    xhr.open("GET", "./OOXML/mergefield.xml", true);
    xhr.send();
}