import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux'
import { getTeams, getUser, getSuggestions, openModal } from '../ducks/reducer';
import Graph from '../charts/Graph';
import './Dashboard.css'
import addSuggestion1 from './Asset 6.svg'
import { Image, Button, Segment, Item, Label, Icon, Header, Visibility, Dropdown } from 'semantic-ui-react';
import ModalManager from '../Modals/Modal';
import suggestionLogo from './sugg-logo-2.svg';
import robot from './Robot.svg';
import bigEye from './big-eye.svg';
import brain from './brain-alien.svg';
import cactus from './cactus.svg';
import orangeAlien from './orange-alien.svg';
import pinkAlien from './pink-alien.svg';
import spottedAlien from './spotted-alien.svg';
import blackLogo from './new-black-logo.svg';
import crashTest from './Crash tes dummies.svg';
import brogrammers from './new-bro.svg';
import sqlInjection from './new-sql.svg';
import { Steps, Hints } from 'intro.js-react';


class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            suggestions: [],
            newSuggestion: '',
            teams: [],
            user: {},
            open: false,
            calculations: {
                pixelsPassed: 0
            },
            stepsEnabled: true,
            initialStep: 0,
            steps: [
                {
                    element: '.graph-wrapper',
                    intro: 'See a birds-eye view of how many votes your teams have completed with these graphs & charts.',
                    tooltipClass: 'myTooltipClass',
                    highlightClass: 'myHighlightClass'
                },
                {
                    element: '.team-rankings',
                    intro: 'See who is leading the way with the team rankings!',
                    tooltipClass: 'myTooltipClass',
                    highlightClass: 'myHighlightClass'
                },
                {
                    element: '.dummy-item',
                    intro: 'Do the work that matters.  Vote on suggestions you think make the biggest difference & grab the ones your team can crush',
                    tooltipClass: 'myTooltipClass',
                    highlightClass: 'myHighlightClass',
                    scrollPadding: 100
                },
                {
                element: '.like-button1',
                intro: 'Think this idea will make the workplace better?  Add some points to it here.',
                tooltipClass: 'myTooltipClass',
                highlightClass: 'myHighlightClass'
            },
            {
                element: '.commit-button1',
                intro: 'If a suggestion is right up your teams alley, commit it to your team.',
                tooltipClass: 'myTooltipClass',
                highlightClass: 'myHighlightClass'
            },
            {
                element: '.add-suggestion',
                intro: 'Got an idea?  Click here at any time to share your suggestion.',
                tooltipClass: 'myTooltipClass',
                highlightClass: 'myHighlightClass'
            }
            ],



        }
        this.onExit=this.onExit.bind(this)
    }

    componentDidMount() {
        axios.get('/getTeams').then(res => {
            this.props.getTeams(res.data)
        })
        axios.get('/auth/me').then(res => {
            this.props.getUser(res.data)
        })
        axios.get('/getSuggestions').then(res => {
            this.props.getSuggestions(res.data)
        })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.suggestions.length) {
            let suggestions = newProps.suggestions.map(obj => {
                obj.voted = newProps.user.voted.some(e => e === obj.suggestion_id)
            })
            this.setState({
                suggestions
            })
        }
    }
    onExit = () => {
        this.setState(() => ({ stepsEnabled: false }));
        let body = {user_id: this.state.user.user_id}
        axios.put('/tutorial', body).then(  () => {
            axios.get('/auth/me').then(res => {
                this.props.getUser(res.data)
            })
        })
      };

    deleteSuggestion(id) {
        axios.delete(`/delete/${id}`).then(res => {
            console.log(res.data)
            this.props.getSuggestions(res.data)
        })
    }

    like(liked, id, initialVal, incrementer) {
        let body = { liked: liked, suggestion_id: id, votes: initialVal, incrementer: incrementer }
        axios.put('/like', body).then(res => {
            console.log(res.data.suggestions)
            this.props.getSuggestions(res.data.suggestions)
            this.props.getUser(res.data.user)
        })
    }

    commitSuggestion(id, suggestion_id) {
        axios.put(`/commitSuggestion/${id}/${suggestion_id}`).then(res => {
            this.props.getSuggestions(res.data)
        })
    }

    handleUpdate = (e, { calculations }) => this.setState({ calculations })


    render() {
        const { stepsEnabled, steps, initialStep, hintsEnabled, hints } = this.state;
        console.log(this.state.calculations.pixelsPassed)
        const inlineStyle = {
            segment: {
                position: 'none !important'
            }
        };
        let teamsBox = this.props.teams.sort((a, b) => b.completed_votes - a.completed_votes).map((obj) => (
            // <Link to={`/Team/${obj.id}`} style={{ textDecoration: 'none'}}>
            <Item as={Link} to={`/Team/${obj.id}`}>
                {obj.id === 2
                    ?
                    <Item.Image circular size='tiny' src={sqlInjection} />
                    :
                    obj.id === 3
                        ?
                        <Item.Image circular size='tiny' src={brogrammers} />
                        :
                        obj.id === 4
                            ?
                            <Item.Image circular size='tiny' src={crashTest} />
                            :
                            <Item.Image circular size='tiny' src={brain} />
                }
                <Item.Content>
                    <Item.Header as='h2' icon textAlign='center'>{obj.team_name}</Item.Header>
                    <Item.Description>
                        Completed votes: {obj.completed_votes}
                    </Item.Description>
                    <Item.Extra>{obj.team_name} is doin' the damn thing.</Item.Extra>
                </Item.Content>
            </Item>
            //  <div className="team-item">
            //        <h5>{this.props.user ? obj.team_name : null}</h5>
            //        <h5>{this.props.user ? obj.completed_votes : null}</h5>
            //        <Link to={`/Team/${obj.id}`}><button>TEAM VIEW</button></Link>
            //     </div>
            //     </Link>
        ))
        if (this.props.suggestions.length > 0) {
            var suggBox = this.props.suggestions.sort((a, b) => b.votes - a.votes).map((obj) => (

                this.props.user.access === 3 ?
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
                        <Item.Content>
                            <Item.Header>{obj.first_name} {obj.last_name}</Item.Header>
                            <Item.Description className='item-description'>{this.props.user ? obj.suggestion : null}</Item.Description>
                            <Item.Extra className='item-extra'>
                                assigned to - {obj.team_name}
                            </Item.Extra>
                            <Item.Extra>
                                <Button floated='right' className="delete-button" icon='remove' onClick={() => this.deleteSuggestion(obj.suggestion_id)}></Button>

                                {
                                    !(obj.assigned_id === 1)
                                        ?
                                        <Button disabled className="like-button" onClick={() => this.like(obj.voted, obj.suggestion_id, obj.votes, 5)} as='div' labelPosition='right'>
                                            <Button color='red'>
                                                <Icon name='empty heart' />
                                            </Button>
                                            <Label as='a' basic color='red' pointing='left'>{this.props.user ? obj.votes : null}</Label>
                                        </Button>
                                        :
                                        (obj.voted)
                                            ?
                                            <Button className="like-button" onClick={() => this.like(obj.voted, obj.suggestion_id, obj.votes, 5)} as='div' labelPosition='right'>
                                                <Button color='red' animated='vertical'>
                                                    <Button.Content hidden>
                                                        <Icon name='arrow down' />
                                                    </Button.Content>
                                                    <Button.Content visible>
                                                        <Icon name='empty heart' />
                                                    </Button.Content>
                                                </Button>
                                                <Label as='a' basic color='red' pointing='left'>{this.props.user ? obj.votes : null}</Label>
                                            </Button>
                                            :
                                            <Button className="like-button" onClick={() => this.like(obj.voted, obj.suggestion_id, obj.votes, 5)} as='div' labelPosition='right'>
                                                <Button color='red' animated='vertical'>
                                                    <Button.Content hidden>
                                                        <Icon name='arrow up' />
                                                    </Button.Content>
                                                    <Button.Content visible>
                                                        <Icon name='empty heart' />
                                                    </Button.Content>
                                                </Button>
                                                <Label as='a' basic color='red' pointing='left'>{this.props.user ? obj.votes : null}</Label>
                                            </Button>
                                    // <Button className="like-button" onClick={() => this.like(obj.voted, obj.suggestion_id, obj.votes, 5)}>Like</Button>
                                }
                                {
                                    (obj.assigned_id === 1)
                                        ?
                                        <Button animated='vertical' className="commit-button" onClick={() => this.commitSuggestion(this.props.user.team_id, obj.suggestion_id)}>
                                            <Button.Content visible>commit</Button.Content>
                                            <Button.Content hidden><Icon color='green' name='check' />committed</Button.Content>
                                        </Button>
                                        :
                                        <Button disabled className="commit-button" onClick={() => this.commitSuggestion(this.props.user.team_id, obj.suggestion_id)}><Icon color='green' name='check' />committed</Button>
                                }
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                    :
                    this.props.user.access === 2 ?
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

                            <Item.Content>
                                <Item.Header>{obj.first_name} {obj.last_name}</Item.Header>
                                <Item.Description className='item-description'>{this.props.user ? obj.suggestion : null}</Item.Description>
                                <Item.Extra className='item-extra'>
                                    assigned to - {obj.team_name}
                                </Item.Extra>
                                <Item.Extra>
                                    <Button floated='right' className="delete-button" icon='remove' onClick={() => this.deleteSuggestion(obj.suggestion_id)}></Button>

                                    {
                                        !(obj.assigned_id === 1)
                                            ?
                                            <Button disabled className="like-button" onClick={() => this.like(obj.voted, obj.suggestion_id, obj.votes, 3)} as='div' labelPosition='right'>
                                                <Button color='red'>
                                                    <Icon name='empty heart' />
                                                </Button>
                                                <Label as='a' basic color='red' pointing='left'>{this.props.user ? obj.votes : null}</Label>
                                            </Button>
                                            :
                                            (obj.voted)
                                                ?
                                                <Button className="like-button" onClick={() => this.like(obj.voted, obj.suggestion_id, obj.votes, 3)} as='div' labelPosition='right'>
                                                    <Button color='red' animated='vertical'>
                                                        <Button.Content hidden>
                                                            <Icon name='arrow down' />
                                                        </Button.Content>
                                                        <Button.Content visible>
                                                            <Icon name='empty heart' />
                                                        </Button.Content>
                                                    </Button>
                                                    <Label as='a' basic color='red' pointing='left'>{this.props.user ? obj.votes : null}</Label>
                                                </Button>
                                                :
                                                <Button className="like-button" onClick={() => this.like(obj.voted, obj.suggestion_id, obj.votes, 3)} as='div' labelPosition='right'>
                                                    <Button color='red' animated='vertical'>
                                                        <Button.Content hidden>
                                                            <Icon name='arrow up' />
                                                        </Button.Content>
                                                        <Button.Content visible>
                                                            <Icon name='empty heart' />
                                                        </Button.Content>
                                                    </Button>
                                                    <Label as='a' basic color='red' pointing='left'>{this.props.user ? obj.votes : null}</Label>
                                                </Button>
                                        // <Button className="like-button" onClick={() => this.like(obj.voted, obj.suggestion_id, obj.votes, 5)}>Like</Button>
                                    }
                                    <Button className="commit-button" onClick={() => this.commitSuggestion(this.props.user.team_id, obj.suggestion_id)}>commit</Button>
                                </Item.Extra>
                            </Item.Content>
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
                            <Item.Content>
                                <Item.Header>{obj.first_name} {obj.last_name}</Item.Header>
                                <Item.Description className='item-description'>{this.props.user ? obj.suggestion : null}</Item.Description>
                                <Item.Extra className='item-extra'>
                                    assigned to - {obj.team_name}
                                    # of points: {this.props.user ? obj.votes : null}
                                </Item.Extra>
                            </Item.Content>
                        </Item>
            ))
        }
        var trigger = ''
        {
            this.props.user.first_name ?
                (this.props.user.first_name.endsWith('a' || 'b' || 'c' || 'd'))
                    ?
                    trigger = <span className='name-span'><Image className='upper-right-avatar' avatar floated='right' src={robot} />{this.props.user.first_name} {this.props.user.last_name}</span>
                    :
                    (this.props.user.first_name.endsWith('e' || 'f' || '' || 'h'))
                        ?
                        trigger = <span className='name-span'><Image className='upper-right-avatar' avatar floated='right' src={bigEye} />{this.props.user.first_name} {this.props.user.last_name}</span>
                        :
                        (this.props.user.first_name.endsWith('i' || 'j' || 'k' || 'l'))
                            ?
                            trigger = <span className='name-span'><Image className='upper-right-avatar' avatar floated='right' src={brain} />{this.props.user.first_name} {this.props.user.last_name}</span>
                            :
                            (this.props.user.first_name.endsWith('m' || 'n' || 'o' || 'p'))
                                ?
                                trigger = <span className='name-span'><Image className='upper-right-avatar' avatar floated='right' src={cactus} />{this.props.user.first_name} {this.props.user.last_name}</span>
                                :
                                (this.props.user.first_name.endsWith('q' || 'r' || 's'))
                                    ?
                                    trigger = <span className='name-span'><Image className='upper-right-avatar' avatar floated='right' src={orangeAlien} />{this.props.user.first_name} {this.props.user.last_name}</span>
                                    :
                                    (this.props.user.first_name.endsWith('u' || 'v' || 'w'))
                                        ?
                                        trigger = <span className='name-span'><Image className='upper-right-avatar' avatar floated='right' src={pinkAlien} />{this.props.user.first_name} {this.props.user.last_name}</span>
                                        :
                                        trigger = <span className='name-span'><Image className='upper-right-avatar' avatar floated='right' src={spottedAlien} />{this.props.user.first_name} {this.props.user.last_name}</span>
                :
                null

        }
        var tut = ''
        var dummyItem = ''
        {this.props.user.first_name
            ?
            this.props.user.tutorial !== true
            ?
           tut = <Steps
            enabled={stepsEnabled}
            steps={steps}
            initialStep={initialStep}
            onExit={this.onExit}
        />
            :
           tut = null
        : null}
        {this.props.user.first_name
            ?
            this.props.user.tutorial !== true
            ?
            dummyItem = <Item className='dummy-item'>
            <Item.Image circular size='tiny' src={robot} />
            <Item.Content>
                <Item.Header>Taylor Miller</Item.Header>
                <Item.Description className='item-description'>I think everyone should use SuggestionBox!</Item.Description>
                <Item.Extra className='item-extra'>
                    assigned to - The BROgrammers
                </Item.Extra>
                <Item.Extra>
                    <Button floated='right' className="delete-button" icon='remove'></Button>
                    <Button className="like-button1" as='div' labelPosition='right'>
                                                        <Button color='red' animated='vertical'>
                                                            <Button.Content hidden>
                                                                <Icon name='arrow up' />
                                                            </Button.Content>
                                                            <Button.Content visible>
                                                                <Icon name='empty heart' />
                                                            </Button.Content>
                                                        </Button>
                                                        <Label as='a' basic color='red' pointing='left'>100</Label>
                                                    </Button>
                                        <Button className="commit-button1">commit</Button>
                                    </Item.Extra>
                                </Item.Content>
            </Item>
            :
           dummyItem = null
        : null}
        return (
            <div onUpdate={this.handleUpdate}>
                {tut}
                <Header className='dash-header2' as='p' icon textAlign='right'>
                    <div className='upper-right'>
                        <Image floated='left' size='medium' className='header-logo1' src={blackLogo} />
                        <Dropdown trigger={trigger} direction='left' pointing='top right' icon={null} >
                            <Dropdown.Menu>
                            <Dropdown.Item className='drop-item' text='logout' iconSize='tiny' />
                                <a href={process.env.REACT_APP_LOGOUT}><Dropdown.Item className='drop-item' icon='sign out' iconSize='tiny' /></a>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </Header>
                <div className="dash-main-container">
                    <div className='header-filler'></div>
                    <div className="graph-wrapper">
                        <Graph />
                    </div>
                    <div className="team-rankings">
                        <Header className='header-pusher' as='h2' textAlign='center'>
                            <Icon name='rocket' />
                            <Header.Content>
                                Team Rankings
                    </Header.Content>
                        </Header>
                        <Item.Group divided>
                            {teamsBox}
                        </Item.Group>
                    </div>
                    <div className="suggestion-rankings">
                        <Header className='header-pusher' as='h2' textAlign='center'>
                            <Icon name='tasks' />
                            <Header.Content>
                                Suggestions
                    </Header.Content>
                        </Header>
                        <Item.Group divided>
                        {dummyItem}
                            {suggBox}
                        </Item.Group>
                    </div>
                    <div>
                        <Button className="add-suggestion" circular color='red' icon='plus' onClick={() => this.props.openModal({
                            header: "Test content",
                            content: "Test content 2"
                        })}>
                        </Button>
                    </div>
                </div>
                <div className="modal-holder">
                    <ModalManager />
                </div>
            </div>
        )
    }

}


function mapStateToProps(state) {
    return {
        teams: state.teams,
        user: state.user,
        suggestions: state.suggestions
    }
}

export default connect(mapStateToProps, { getTeams, getUser, getSuggestions, openModal })(Dashboard);






// const suggestion = {
//     name: '',
//     assigned_team: '',
//     numberofpoints: 0,
//     id: 0,
//     liked: false,

// }

//delete - will send suggestion id
//like - needs to know if its liked or not and will update sends userid and suggestionid
// let body = { liked? = true / false based on suggestion object, suggestion_id: id, votes: initialVal, incrementer: incrementer }
//  axios.put('/like', body).then(res => {
// this.props.getSuggestions(res.data)
// this.props.getUser(res.data)

// ---- controller -----
// removeLike: (req, res) => {
// const db = req.app.get('db');
// let newVotes = 0;
// let newArr = [...req.user.voted]
//          if(req.body.liked) {
// newVotes = req.body.votes -= req.body.incrementer
// newArr.splice(newArr.indexOf(params.id), 1)
// } else { newVotes = req.body.votes += req.body.incrementer
// newArr.push(params.id)
// };
// const {suggestion_id} = req.body;
// db.addLike(newVotes, suggestion_id, newArr, req.user.user_id).then(suggestions => res.status(200).send(suggestions))
// })
// -------SQL---------
// UPDATE "public"."users" SET "voted"=$3 WHERE "user_id"=$4;
// UPDATE suggestions
// SET votes=$1
// WHERE suggestion_id=$2;
// select * from suggestions;
// 
// 
// 
//commit - needs to know if it has an assigned team needs team id of current user.
//
// 

//     db.updatevotes(adsfadsfas).then(votes => {
//         db.getuser.then(user => {
//             let data = {user, votes}
//             res.status.send(data) 
//         })
//     })
// })





{/* <div >
<p className="suggestion-user">suggested by - {obj.first_name} {obj.last_name}</p>
<h5 className="suggestion">{this.props.user ? obj.suggestion : null}</h5>
<h5 className="assigned-team"> assigned to - {obj.team_name}</h5>
<p className="vote-number"># of points: {this.props.user ? obj.votes : null}</p>
<Button className="delete-button"  icon='remove' onClick={() => this.deleteSuggestion(obj.suggestion_id)}></Button>
{
    !(obj.assigned_id === 1)
        ?
        null
        :
        <button className="like-button" onClick={() => this.like(obj.voted, obj.suggestion_id, obj.votes, 5)}>Like</button>
}
<button className="commit-button" onClick={() => this.commitSuggestion(this.props.user.team_id, obj.suggestion_id)}>commit suggestion to team</button>
</div> */}










