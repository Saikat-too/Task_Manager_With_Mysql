// Importing necessary modules
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app =express();
app.use (exprss.json);

app.use('/auth' , authRoutes);
app.use('/task' ,taskRoutes);

const Port =3005;
app.listen(PORT , () =>{
    console.log('Server is running on ${Port}')
});