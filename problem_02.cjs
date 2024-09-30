const fs = require("fs");
const path = require("path");


/*
    Problem 2:
    
    Using async await functions.

*/


// Store the name of the new file in filenames.txt
function store_filenames(filePath, file) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, file + "\n", (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("");
            }
        });
    });
}


// 1. Read the given input file.
function file_reader(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data);
            }
        })
    })
}


//function to write files.
function file_writer(data, filePath) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("");
            }
        });
    });
}


// 2. Convert the content to uppercase & write to a new file. 
function convert_to_uppercase(content, filePath) {
    const uppercase_content = content.toUpperCase();

    return file_writer(uppercase_content, filePath);
}

// function to convert file content to lower case. Then split the contents into sentences. 
function convert_to_lowercase(content, filePath) {
    const lowercase_content = content.toLowerCase();
    const sentences = lowercase_content.split(/(?<=[.!?])\s+/);

    return file_writer(sentences.join(" "), filePath);
}


function sort_content(data, filePath) {
    const file_data_sorted = data.split(" ").sort((a, b) => a.localeCompare(b)).join("\n");

    return file_writer(file_data_sorted, filePath);
}

// function to iterate list and delete all the new files that are mentioned in that list simultaneously.
function delete_files(file) {
    const seperate = file.split("\n").filter(Boolean);

    const remove_files = seperate.map((link) => {
        new Promise((resolve, reject) => {
            fs.unlink(link, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(link);
                }
            });
        });
    });
    return Promise.all(remove_files);

}

module.exports = { file_reader, convert_to_uppercase, convert_to_lowercase, delete_files, sort_content, store_filenames };