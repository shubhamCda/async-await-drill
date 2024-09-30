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
        
        
    } catch (error) {
        
    }
}

problem_02_process();


// 1. Read the given input file.
function file_reader(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                reject(err)
            }else{
                resolve(data);
            }
        })
    })
}
