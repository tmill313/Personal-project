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




const app = express();

app.use(express.static(`${__dirname}/../build`))

app.use(bodyParser.json())

massive(CONNECTION_STRING).then(db => {app.set('db', db);})

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
           db.create_user([profile.name.givenName, profile.name.familyName, profile.id, [0]]).then(userCreated => {
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
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: process.env.HOMEPAGE
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
app.put('/like', ctrl.like)
app.post('/addSuggestion', ctrl.addSuggestion)
app.get('/getTeam/:id', ctrl.getTeam)
app.get('/getTeamSuggestions/:id', ctrl.getTeamSuggestions)
app.put('/commitSuggestion/:id/:suggestion_id', ctrl.commitSuggestion)
app.get('/getRole', ctrl.getRole)
app.put('/setUser/:teamId/:position/:access', ctrl.setUser)
app.put('/completion/:id/:assigned_id/:votes/:completed/:completed_votes', ctrl.completion)





app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(process.env.HOMEPAGE)
})









  app.listen(SERVER_PORT, () => {
    console.log('listening on port:', SERVER_PORT);
  });