const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const questionRoutes = require('./routes/questionRoutes');
const userRoutes = require('routes/userRoutes')

const app = express();

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

//view engine
app.set('view engine', 'ejs');

//database connection
const dbURI = "mongodb+srv://Krishi:P@s$w0rd@cluster0.o87js.mongodb.net/water_distribution_system?retryWrites=true&w=majority"
mongoose.connect(dbURI, {useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
    .then((result)=>app.listen(3000))
    .catch((err)=>console.log(err));

//general routes
app.get('/', (req, res) => {
    res.send('Quiz app online');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//routes
app.use('/question',questionRoutes);
app.use('/user',userRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});