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
    addLike: (req, res) => {
        const db = req.app.get('db');

        const newVotes = req.body.votes += req.body.incrementer;
        const {suggestion_id} = req.body;
        db.addLike(newVotes, suggestion_id).then(suggestions => res.status(200).send(suggestions))
    },
    removeLike: (req, res) => {
        const db = req.app.get('db');

        const newVotes = req.body.votes -= req.body.incrementer;
        const {suggestion_id} = req.body;
        db.addLike(newVotes, suggestion_id).then(suggestions => res.status(200).send(suggestions))
    },
    getTeam: (req, res) => {
        const db = req.app.get('db');

        const{params} = req;
        db.getTeam([params.id]).then(team => res.status(200).send(team))
    },
    getTeamSuggestions: (req, res) => {
        const db = req.app.get('db');

        const{params} = req;
        db.getTeamSuggestions([params.id]).then(teamSuggestions => res.status(200).send(teamSuggestions))
    },
    taskCompleted: (req, res) => {
        const db= req.app.get('db');

        const{params} = req;
        db.taskCompleted([params.id, params.assigned_id, params.votes]).then(teamSuggestions => res.status(200).send(teamSuggestions))
    },
    taskNotCompleted: (req, res) => {
        const db= req.app.get('db');

        const{params} = req;
        db.taskNotCompleted([params.id, params.assigned_id, params.votes]).then(teamSuggestions => res.status(200).send(teamSuggestions))
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
    pushLike: (req, res) => {
        const db = req.app.get('db');
        let newArr = [...req.user.voted]
        const{params} = req;
        newArr.push(params.id)
        db.pushLike([newArr, req.user.user_id]).then(user => res.status(200).send(user))
    },
    spliceLike: (req, res) => {
        const db = req.app.get('db');
        let newArr = [...req.user.voted]
        const{params} = req;
        let index = newArr.indexOf(params.id)
        newArr.splice(index, 1)
        db.pushLike([newArr, req.user.user_id]).then(user => res.status(200).send(user))
    }








}