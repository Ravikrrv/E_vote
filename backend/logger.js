// const fs = require('fs');
// const path = require('path');

// const logFilePath = path.join(__dirname, 'log.txt');
// exports.logUserRegistration = (userId, dateTime, location) => {
//     // const dateTime = new Date().toISOString();
//     // const location = 'Sample Location'; // Replace with actual location retrieval logic if needed

//     const logMessage = `[${dateTime}] User registered with _id: ${userId} from ${location}\n`;

//     fs.appendFile(logFilePath, logMessage, (err) => {
//         if (err) {
//             console.error('Error writing to log file:', err);
//         } else {
//             console.log('User registration logged.');
//         }
//     });
// };

const fs = require('fs');
const axios = require('axios');
const path = require('path');

const logFilePath = path.join(__dirname, 'log.txt');

const logUserAction = async (userId, action) => {
    try {
        const response = await axios.get('https://ipinfo.io/json');
        const { ip, city, region, country } = response.data;
        const location = `${city}, ${region}, ${country}`;
        const logEntry = `${new Date().toISOString()} - User: ${userId} - Action: ${action} - IP: ${ip} - Location: ${location}\n`;
        
        fs.appendFileSync(logFilePath, logEntry);
    } catch (error) {
        console.error('Error fetching IP address:', error);
    }
};

module.exports = {
    logUserAction
};

