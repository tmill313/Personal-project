module.exports = {
    addSuggestion: (req, res) => {
        const db = req.app.get('db');
        const suggid = {suggid: 5};
        const{suggestion, date, user_id, votes, assigned_id, completed} = req.body;
        db.addSuggestion(suggestion, date, user_id, votes, assigned_id, completed).then(() => res.status(200).send());
    },
    getTeams: (req, res) => {
        const db = req.app.get('db');

        db.getTeams().then(teams => res.status(200).send(teams))
    },
    getSuggestions: (req, res) => {
        const db = req.app.get('db');

        db.getSuggestions().then(suggestions => res.status(200).send(suggestions))
    },
    deleteSuggestion: (req, res) => {
        const db = req.app.get('db');

        const {params} = req;
        db.deleteSuggestion(params.id).then(suggestions => res.status(200).send(suggestions))
    },
    like: (req, res) => {
        const db = req.app.get('db');
        let newVotes = 0;
        let newArr = [...req.user.voted];
        let index = newArr.indexOf(req.body.suggestion_id)
        if(req.body.liked) {
            newVotes = req.body.votes -= req.body.incrementer;
            newArr.splice(index, 1);
        } else {
            newVotes = req.body.votes += req.body.incrementer;
            newArr.push(req.body.suggestion_id)
        }
        db.pushLike([newArr, req.user.user_id]).then(users => {
            db.addLike([newVotes, req.body.suggestion_id]).then(suggestions => {
                let data = {user:users[0], suggestions}
                res.status(200).send(data)
            })
        })
    },
    getTeam: (req, res) => {
        const db = req.app.get('db');

        const{params} = req;
        db.getTeam([params.id]).then(team => res.status(200).send(team[0]))
    },
    getTeamSuggestions: (req, res) => {
        const db = req.app.get('db');

        const{params} = req;
        db.getTeamSuggestions([params.id]).then(teamSuggestions => {
            db.getTeam([params.id]).then(teams => {
                let data = {team: teams[0], teamSuggestions}
                res.status(200).send(data)
            })
        })
    },
    completion: (req, res) => {
        const db = req.app.get('db');
        let completedVotes = parseInt(req.params.completed_votes);
        let theseVotes = parseInt(req.params.votes);
        let newVotes = 0;
        if(req.params.completed == 'true') {
            newVotes = completedVotes += theseVotes;
        } else {
            newVotes = completedVotes -= theseVotes;
        }
        db.completion([req.params.id, req.params.assigned_id, newVotes, req.params.completed]).then(teamSuggestions => {
            db.getTeam([req.params.assigned_id]).then(teams => {
                let data = {team: teams[0], teamSuggestions}
                res.status(200).send(data)
            })
        })
    },
    commitSuggestion: (req, res) => {
        const db= req.app.get('db');

        const{params} = req;
        db.commitSuggestion([params.id, params.suggestion_id]).then(teamSuggestions => res.status(200).send(teamSuggestions))
    },
    getRole: (req, res) => {
        const db = req.app.get('db');

        db.getUser([req.user.user_id]).then(user => res.status(200).send(user))
    },
    setUser: (req, res) => {
        const db = req.app.get('db');

        const{params} = req;
        db.setUser([req.user.user_id, params.teamId, params.position, params.access]).then(() => res.status(200).send())
    },









}