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


async function problem_02_process(params) {
    try {
        const input_file_data = await file_reader(input_file_path);
        console.log("file read successfully");


        await convert_to_uppercase(input_file_data, uppercase_file_path);
        console.log("uppercase file updated successfull..!");

        await store_filenames(uppercase_file_path);
        console.log("filenames.txt updated..!");
        



    } catch (error) {

    }
}

problem_02_process();


function store_filenames(file) {
    return new Promise((resolve, reject) => {
        fs.appendFile(filenames_path, file + "\n", (err) => {
            if (err) {
                reject(err);
            }else{
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

function convert_to_uppercase(content, filePath) {
    const uppercase_content = content.toUpperCase();

    return file_writer(uppercase_content, filePath);
}