const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 1245;

// Helper function to read CSV file and parse students
function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        const lines = data.split('\n').filter(line => line.trim() !== '');
        const students = {};
        lines.forEach((line, index) => {
          if (index > 0) {
            const [firstName, field] = line.split(',');
            if (field) {
              if (!students[field]) {
                students[field] = [];
              }
              students[field].push(firstName);
            }
          }
        });
        resolve(students);
      }
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', async (req, res) => {
  const database = process.argv[2];
  try {
    const students = await readDatabase(database);
    let responseText = 'This is the list of our students\n';
    const fields = Object.keys(students);
    fields.forEach(field => {
      responseText += `Number of students in ${field}: ${students[field].length}. List: ${students[field].join(', ')}\n`;
    });
    res.send(responseText.trim());
  } catch (error) {
    res.send('Cannot load the database');
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;