module.exports = {
    addSuggestion: (req, res) => {
        const db = req.app.get('db');
        const suggid = {suggid: 5};
        const{suggestion, date, user_id, votes, assigned_id, completed} = req.body;
        db.addSuggestion(suggestion, date, user_id, votes, assigned_id, completed).then(() => res.status(200).send());
    },
    getTeams: (req, res) => {
        const db = req.app.get('db');

        db.getTeams(). then(teams => res.status(200).send(teams))
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
    }








}