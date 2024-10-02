const fs = require("fs");
const path = require("path");


/*
    Problem 2:
    
    Using async await functions.

*/


const input_file_path = path.join(__dirname, "lipsum.txt");
const uppercase_file_path = path.join(__dirname, "uppercase.txt");
const lowercase_file_path = path.join(__dirname, "lowercase.txt");
const sorted_file_path = path.join(__dirname, "sorted.txt");
const filenames_path = path.join(__dirname, "filenames.txt");


async function problem_02_async_function() {
    try {
        const input_file_data = await file_reader(input_file_path);
        console.log("file read successfully");

        await convert_to_uppercase(input_file_data, uppercase_file_path);
        console.log("uppercase file updated successfull..!");

        await store_filenames(filenames_path,uppercase_file_path);
        console.log("filenames.txt updated..!");

        const uppercase_file_content = await file_reader(uppercase_file_path);
        await convert_to_lowercase(uppercase_file_content, lowercase_file_path);
        console.log("lowercase.txt updated..!");


        await store_filenames(filenames_path,lowercase_file_path);
        console.log("filenames.txt updated..!");

        const lowercase_file_content = await file_reader(lowercase_file_path);
        await sort_content(lowercase_file_content, sorted_file_path);
        console.log("sorted.txt updated..!");

        await store_filenames(filenames_path, sorted_file_path);
        console.log("filenames.txt updated..!");

        const filenames_content = await file_reader(filenames_path);
        await delete_files(filenames_content);
        console.log("Deleted successfully..!");     



    } catch (error) {
        console.log("Something went wrong.!", error);
        
    }
}

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

module.exports = { problem_02_async_function };