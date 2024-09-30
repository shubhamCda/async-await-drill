const fs = require("fs");
const path = require("path");



//function to make new directory
function make_directory(dirPath) {
    return new Promise((resolve, reject) => {
        fs.mkdir(dirPath, { recursive: true }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("");
            }
        })
    })

}


function json_file_generator(count, dirPath) {
    const promise_values = [];
    
    
    for (let index = 1; index <= count; index++) {
        const json_file = path.join(dirPath, `json_file_${index}.json`);
        const json_data = JSON.stringify({
            username: 'shubham',
            gender: 'male'
        });       

        const p = new Promise((resolve, reject) => {
            fs.writeFile(json_file, json_data, (err, file) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(file);
                }
            });
        });
        promise_values.push(p);

    }
    return Promise.all(promise_values)
}


module.exports = { make_directory, json_file_generator };
