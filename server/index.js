require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const ctrl = require('./controller');


const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env


massive(CONNECTION_STRING).then(db => {app.set('db', db);})

const app = express();
app.use(bodyParser.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'

}, function(accesToken, refreshToken, extraParams, profile, done) {
    const db = app.get('db')
    db.find_user([profile.id]).then(users => {
       if(!users[0]) {
           db.create_user([profile.name.givenName, profile.name.familyName, 1, 'manager',  profile.id]).then(userCreated => {
                done(null, userCreated[0].user_id)
           })
       } else {
           done(null, users[0].user_id)
       }
    })
    

}))
passport.serializeUser( (id, done) => {
    done(null, id)
})
passport.deserializeUser( (id, done) => {
    app.get('db').find_session_user([id]).then(user => {
        done(null, user[0])
    })
})

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard',
    failureRedirect: 'http://localhost:3000'
}))
app.get('/auth/me', (req, res) => {
    if(req.user) {
        res.status(200).send(req.user)
    } else {
        res.status(401).send('nice try')
    }
})




app.get('/getTeams', ctrl.getTeams)
app.get('/getSuggestions', ctrl.getSuggestions)
app.delete('/delete/:id', ctrl.deleteSuggestion)
app.put('/like', ctrl.addLike)
app.post('/addSuggestion', ctrl.addSuggestion)




app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect('http://localhost:3000/')
})









  app.listen(SERVER_PORT, () => {
    console.log('listening on port:', SERVER_PORT);
  });