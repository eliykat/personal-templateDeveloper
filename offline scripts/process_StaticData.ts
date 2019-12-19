// Offline script used to populate the static (i.e. non-custom) data sources
// Only needs to be run once, and then if Actionstep updates its data in a future release.

// The only argument should be a CSV containing a complete export of AS merge fields.
// The format must be manually set in column N of the CSV:
// d = date
// c = currency
// s = string
// n = number (e.g. integer, floating point, percentage)
// p = phone number
// b = boolean

const papa = require('papaparse');
const fs = require('fs');

const csv:string = process.argv[2];
const csv_string:string = fs.readFileSync(csv).toString('utf-8');

let prevDataSource:string;

const json = {
    dataSources: []
};

let dataSources = json.dataSources;
let currentIndex: number;

papa.parse(csv_string, {
    complete: function (results){

        console.log('parsed');
        
        // Starts at 1 to skip headers
        for (var i = 1; i < results.data.length; i++) {

            // Skip empty rows
            if (results.data[i] == "") {
                continue
            }

            let source = results.data[i][2];
            let desc = results.data[i][6];
            let code = results.data[i][3];
            let format = results.data[i][13];

            // Create new datasource if required. This assumes the source file is ordered by data source
            if (source != prevDataSource) {
                currentIndex = dataSources.push(
                    {
                        key: source,
                        text: source,
                        fields: []
                    }
                ) - 1;
            }

            let field = {
                text: desc,
                key: code,
                format: format
            }

            dataSources[currentIndex].fields.push(field);

            prevDataSource = source;
            
        }

        const stringified_json:string = JSON.stringify(json);

        fs.writeFile('static.json', stringified_json, (err) => {
            console.log('Success');
        })
    }
})