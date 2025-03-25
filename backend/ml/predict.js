const { spawn } = require("child_process");
const path = require("path");

const predictCategory = async (subcategory, note, amount, hour, dayofweek, payment_mode) => {
    return new Promise((resolve, reject) => {
        const pythonProcess = spawn("python3", [path.join(__dirname, "predict.py"), subcategory, note, amount, hour, dayofweek, payment_mode]);

        pythonProcess.stdout.on("data", (data) => {
            resolve(data.toString().trim());  // Get category from Python
        });

        pythonProcess.stderr.on("data", (data) => {
            console.error(`Error in AI prediction: ${data}`);
            reject(data.toString());
        });
    });
};

module.exports = predictCategory;
