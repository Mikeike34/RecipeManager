import express from 'express'; //using express to build out an API

const app = express(); //variable for the express function

app.listen(5000, () => { //run with 'npm run dev' in terminal...using nodemon so changes are automatically updated
    console.log('server started at http://localhost:5000');
});

app.get('/', (req, res) => {
    res.send('Server is ready');
});