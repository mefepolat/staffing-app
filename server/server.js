const express = require('express');
const app = express();
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const LocalStrategy = require('passport-local');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require('./models/user');
const ExpressError = require('./utils/ExpressError');


app.use(
    cors({
        origin: "http://localhost:3001",
        optionsSuccessStatus: 200,
        credentials: true
    })
);
const dbUrl = "mongodb://127.0.0.1:27017/staffing-ai";

mongoose.set('strictQuery', false);
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
    console.log('database connection is successful');
});

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'justasecretfornow'
    },
    collectionName: 'sessions'
});

const sessionConfig = {
    store: store,
    name: 'session',
    secret: 'justasecretfornow',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session(sessionConfig));
app.use(express.urlencoded({extended: true}));
app.use(mongoSanitize());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser();
passport.deSerializeUser();

app.get('/api/session', (req,res) => {
    const session = req.session;

    if(session && session.user){
        res.json({loggedIn: true, user:session});
    } else {
        res.json({loggedIn: false});
    }
});

app.all('*', (req,res,next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.listen(5000, () => {
    console.log('server is running on port 5000');
})
