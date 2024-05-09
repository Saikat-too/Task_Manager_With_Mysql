// Importing necessary modules
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app =express();
app.use (express.json);

app.use('/auth' , authRoutes);
app.use('/task' ,taskRoutes);

const PORT =3000;
app.listen(PORT , () =>{
    console.log('Server is running on ${PORT}')
});