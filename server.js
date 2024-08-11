const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb+srv://saniulsaz:12345@roktodin.abnxvco.mongodb.net/ResultSystem2025', {

})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Define the student schema and model
const { Schema } = mongoose;
const studentSchema = new Schema({
    name: String,
    studentId: String,
    phone: String,
    group: String,
    college: String,
  });
  
  
const Student = mongoose.model('Student', studentSchema);
app.post('/api/students', async (req, res) => {
    try {
      console.log('Received data:', req.body);
  
      const { name, studentId, phone, group, college, gpa, status } = req.body;
      
      const newStudent = new Student({
        name,
        studentId,
        phone,
        group,
        college,
      });
  
      const savedStudent = await newStudent.save();
  
      res.status(201).json({
        message: 'Student added successfully',
        student: savedStudent
      });
    } catch (error) {
      console.error('Error adding student:', error);
      res.status(500).json({
        message: 'Internal server error',
        error: error.message
      });
    }
  });
  app.get('/api/students/:studentId', async (req, res) => {
    try {
        const { studentId } = req.params;
  
        const result = await Student.findOne({ studentId });
  
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
  
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving result', error: error.message });
    }
  });
  


const resultSchema = new mongoose.Schema({
  studentId: String,
  physics: String,
  math:String,
  chemistry:String,
  total:String,
  grade: String,

});

const Result = mongoose.model('Result', resultSchema);

module.exports = Result;

app.post('/api/results', async (req, res) => {
  try {
      const { studentId, physics, math, chemistry, total, grade } = req.body;

      const newResult = new Result({
          studentId,
          physics,
          math,
          chemistry,
          total,
          grade,
      });

      await newResult.save();
      res.status(201).json({ message: 'Result added successfully', result: newResult });
  } catch (error) {
      res.status(500).json({ message: 'Error adding result', error: error.message });
  }
});

app.get('/api/results/:studentId', async (req, res) => {
  try {
      const { studentId } = req.params;

      const result = await Result.findOne({ studentId });

      if (!result) {
          return res.status(404).json({ message: 'Result not found' });
      }

      res.status(200).json(result);
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving result', error: error.message });
  }
});



// Serve static files
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
