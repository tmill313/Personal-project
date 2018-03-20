import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { getTeam, getTeamSuggestions } from '../ducks/reducer';
import './Team.css'
import { Button, Item, Label, Icon } from 'semantic-ui-react';
import robot from './Robot.svg';
import bigEye from './big-eye.svg';
import brain from './brain-alien.svg';
import cactus from './cactus.svg';
import orangeAlien from './orange-alien.svg';
import pinkAlien from './pink-alien.svg';
import spottedAlien from './spotted-alien.svg';


class Team extends Component {
    constructor() {
        super();

    }


    componentDidMount() {
        axios.get(`/getTeam/${this.props.match.params.id}`).then(res => {
            this.props.getTeam(res.data)
        })
        axios.get(`/getTeamSuggestions/${this.props.match.params.id}`).then(res => {
            this.props.getTeamSuggestions(res.data.teamSuggestions)
        })
    }
    completion(completed_votes, completed, id, assigned_id, votes) {
        axios.put(`/completion/${id}/${assigned_id}/${votes}/${!completed}/${completed_votes}`).then(res => {
            this.props.getTeamSuggestions(res.data.teamSuggestions)
            this.props.getTeam(res.data.team)
        })
    }

    render() {
        let thisTeamSuggestions = this.props.teamSuggestions.map(obj => (
            this.props.user.access === 2 || this.props.user.access === 3 ?
                <Item>
                        {(obj.first_name.endsWith('a' || 'b' || 'c' || 'd'))
                        ?
                        <Item.Image circular size='tiny' src={robot} />
                        :
                        (obj.first_name.endsWith('e' || 'f' || 'g' || 'h'))
                        ?
                        <Item.Image circular size='tiny' src={bigEye} />
                        :
                        (obj.first_name.endsWith('i' || 'j' || 'k' || 'l'))
                        ?
                        <Item.Image circular size='tiny' src={brain} />
                        :
                        (obj.first_name.endsWith('m' || 'n' || 'o' || 'p'))
                        ?
                        <Item.Image circular size='tiny' src={cactus} />
                        :
                        (obj.first_name.endsWith('q' || 'r' || 's'))
                        ?
                        <Item.Image circular size='tiny' src={orangeAlien} />
                        :
                        (obj.first_name.endsWith('u' || 'v' || 'w'))
                        ?
                        <Item.Image circular size='tiny' src={pinkAlien} />
                        :
                        <Item.Image circular size='tiny' src={spottedAlien} />
                        } 
                    {!obj.completed ?
                    <Item.Content>
                            <Item.Header>{obj.first_name} {obj.last_name}</Item.Header>
                            <Item.Description>{obj.suggestion}</Item.Description>
                            <Item.Extra>votes: {obj.votes}</Item.Extra>
                            <Item.Extra><Icon size='big' name='circle' />
                            <Button className='completed-button' floated='right' animated='vertical' onClick={() => this.completion(this.props.team.completed_votes, obj.completed, obj.suggestion_id, obj.assigned_id, obj.votes)}>
                            <Button.Content hidden><Icon color='green' name='checkmark' /></Button.Content>
                        <Button.Content visible><Icon color='red' name='remove' /></Button.Content>
                        </Button></Item.Extra>
                        </Item.Content>
                            :
                            <Item.Content tertiary>
                            <Item.Header>{obj.first_name} {obj.last_name}</Item.Header>
                            <Item.Description>{obj.suggestion}</Item.Description>
                            <Item.Extra>votes: {obj.votes}</Item.Extra>
                            <Item.Extra><Icon size='big' color='green' name='check circle' />
                        <Button className='completed-button' floated='right' animated='vertical' onClick={() => this.completion(this.props.team.completed_votes, obj.completed, obj.suggestion_id, obj.assigned_id, obj.votes)}>
                        <Button.Content visible><Icon color='green' name='checkmark' /></Button.Content>
                        <Button.Content hidden><Icon color='red' name='remove' /></Button.Content>
                        </Button></Item.Extra>
                        </Item.Content>}
                        </Item>
            :
            <Item>
                        {(obj.first_name.endsWith('a' || 'b' || 'c' || 'd'))
                        ?
                        <Item.Image circular size='tiny' src={robot} />
                        :
                        (obj.first_name.endsWith('e' || 'f' || 'g' || 'h'))
                        ?
                        <Item.Image circular size='tiny' src={bigEye} />
                        :
                        (obj.first_name.endsWith('i' || 'j' || 'k' || 'l'))
                        ?
                        <Item.Image circular size='tiny' src={brain} />
                        :
                        (obj.first_name.endsWith('m' || 'n' || 'o' || 'p'))
                        ?
                        <Item.Image circular size='tiny' src={cactus} />
                        :
                        (obj.first_name.endsWith('q' || 'r' || 's'))
                        ?
                        <Item.Image circular size='tiny' src={orangeAlien} />
                        :
                        (obj.first_name.endsWith('u' || 'v' || 'w'))
                        ?
                        <Item.Image circular size='tiny' src={pinkAlien} />
                        :
                        <Item.Image circular size='tiny' src={spottedAlien} />
                        } 
                        {(!obj.completed) ?
                            <Item.Content>
                                <Item.Header>{obj.first_name} {obj.last_name}</Item.Header>
                                <Item.Description>{obj.suggestion}</Item.Description>
                                <Item.Extra>votes: {obj.votes}</Item.Extra>
                                <Item.Extra>Is currently being worked on</Item.Extra>
                                </Item.Content>
                                :
                
                <Item.Content>
                                <Item.Header>{obj.first_name} {obj.last_name}</Item.Header>
                                <Item.Description>{obj.suggestion}</Item.Description>
                                <Item.Extra>votes: {obj.votes}</Item.Extra>
                                <Item.Extra>Is completed</Item.Extra>
                </Item.Content>}

                </Item>
            ))
    
            let teamName =
            <div>
                        <h1>{this.props.team.team_name}</h1>
                        <h1>Completed votes: {this.props.team.completed_votes}</h1>
                    </div>

                    return (
            <div>
                        <Link to='/dashboard'><button>Back to Dashboard</button></Link>
                        {teamName}
                            <Item.Group divided>
                                {thisTeamSuggestions}
                            </Item.Group>
                    </div>
                    )
                }
            
            
            
            }
            
            
function mapStateToProps(state) {
    return {
                        team: state.team,
                    teamSuggestions: state.teamSuggestions,
                    user: state.user
                }
            }
            
export default connect(mapStateToProps, {getTeam, getTeamSuggestions })(Team);
                    
                    
                    
                    
                    
                    
                    
                    
                    //--------taskcompleted/notcompleted ---------
// task(completed, id, assigned_id, votes) {
//         axios.put(`/taskCompleted/${id}/${assigned_id}/${votes}/${!completed}`).then(res => {
//             this.props.getTeamSuggestions(res.data)
//         })
// }
// --------------- controller --------------
// task: (req, res) => {
//     const db= req.app.get('db');
        // let sign = '';
//      req.params.completed ? sign = + : sign = -;
//     const{params} = req;
//     db.taskNotCompleted([params.id, params.assigned_id, params.votes, params.completed, sign]).then(teamSuggestions => res.status(200).send(teamSuggestions))
// }
// ---------------SQL-------------------
// UPDATE "public"."suggestions" SET "completed"=$4 WHERE 
// "suggestion_id"= $1;
// UPDATE "public"."teams" SET "completed_votes"= completed_votes $5 $3 WHERE "id"=$2;
// select * from suggestions where assigned_id = $2
// order by completed;


