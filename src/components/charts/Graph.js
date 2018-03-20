import React, { Component } from 'react'
import { Doughnut, Line } from 'react-chartjs-2'
import { connect } from 'react-redux'
import {getTeams} from '../ducks/reducer';
import CountUp from 'react-countup';
import './Graph.css'

class Graph extends Component {
   constructor() {
       super()

       this.state = {
           votes: 0,
           data: {
               labels: [],
               datasets: [{
                   label: 'Completed votes',
                   data: [],
                   backgroundColor: [
                       'rgba(255, 89, 100, 1)',
                       'rgba(68, 204, 255, 1)',
                       'rgba(69, 240, 223, 1)',
                       'rgba(75, 192, 192, 0.2)',
                       'rgba(153, 102, 255, 0.2)',
                       'rgba(255, 159, 64, 0.2)'
                   ],
                   borderColor: [
                       'rgba(255, 89, 100, 1)',
                       'rgba(68, 204, 255, 1)',
                       'rgba(69, 240, 223, 1)',
                       'rgba(75, 192, 192, 1)',
                       'rgba(153, 102, 255, 1)',
                       'rgba(255, 159, 64, 1)'
                   ],
                   borderWidth: 1
               }]
           },
           data2: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            datasets: [{
                label: 'Total completed votes',
                data: [677, 567, 544, 3],
                backgroundColor: [
                    'rgba(255, 89, 100, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 89, 100, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
       }
   }

   componentWillReceiveProps({teams}) {
        let newcompleted_votes = teams.map(e => e.completed_votes).reduce((x,y) => x + y)
        let data = Object.assign({}, this.state.data)
        let graphVote = Object.assign({}, this.state.data2)
        graphVote.datasets[0].data.splice(graphVote.datasets[0].data.length-1, 1, newcompleted_votes)
        data.datasets[0].data = teams.map(e => e.completed_votes)
        data.labels = teams.map(e => e.team_name)
       this.setState({
           votes: newcompleted_votes,
            data: data
       })
   }



   render() {

       return (
           <div className="graph-wrapper">
           <div className='graph'>
               <Doughnut data={this.state.data} height={350} width={400} />
               </div>
               <div className="graph-filler">
                <h1 className="counter-text"><CountUp className='counter'start={0} end={this.state.votes} /> votes completed & counting.</h1>
                </div>
                <div className='line-graph'>
                <Line data={this.state.data2} height={250} width={400} />
                </div>
                </div>
           
       )
   }
}

function mapStateToProps(state) {
    return {
        teams: state.teams
    }
}



export default connect(mapStateToProps, {getTeams})(Graph)