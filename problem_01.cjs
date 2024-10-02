const fs = require("fs");
const path = require("path");

/*
    Problem 1:
    
    Using async await functions, do the following:
        1. Create a directory of random JSON files
        2. Delete those files simultaneously 
*/

const folder = path.join(__dirname, "json-files");

async function problem_01_async_function(count) {
    try {
        await make_directory(folder);
        console.log("Directory created..!");

        const json_file = await json_file_generator(count, folder);      
        console.log("json files generated..!");

        await delete_files(json_file);
        console.log("Deleted successfully..!");
        

    } catch (error) {
        console.log("Something is wrong..!", error);

    }
}

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


//function to generate random json files
function json_file_generator(count, dirPath) {
    const promise_values = [];

    for (let index = 1; index <= count; index++) {
        const json_file = path.join(dirPath, `json_file_${index}.json`);
        const json_data = JSON.stringify({
            username: 'shubham',
            gender: 'male'
        });

        const p = new Promise((resolve, reject) => {
            fs.writeFile(json_file, json_data, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(json_file);
                }
            });
        });
        promise_values.push(p);

    }
     
    return Promise.all(promise_values)
}


// function to delete files simultaneously 
function delete_files(files) {
       
    const remove_files = files.map((link) => {
        new Promise((resolve, reject) => {
            fs.unlink(link, (err) => {
                if (err) {
                    reject(err);
                }else{
                    resolve("success")
                }
            })
        });
    });
      
    return Promise.all(remove_files);
}


module.exports = { problem_01_async_function };
