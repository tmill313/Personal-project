import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2'
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
                   label: 'Your LPI History',
                   data: [],
                   backgroundColor: [
                       'rgba(46, 41, 70, 0.6)',
                       'rgba(205, 23, 49, 0.6)',
                       'rgba(232, 181, 53, 0.6)',
                       'rgba(75, 192, 192, 0.2)',
                       'rgba(153, 102, 255, 0.2)',
                       'rgba(255, 159, 64, 0.2)'
                   ],
                   borderColor: [
                       'rgba(46, 41, 70, 1)',
                       'rgba(205, 23, 49, 1)',
                       'rgba(232, 181, 53, 1)',
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
               <Doughnut data={this.state.data} height={350} width={650} />
               </div>
               <div className="graph-filler">
               
                <h1 className="counter-text"><CountUp className='counter'start={0} end={this.state.votes} /> votes completed & counting.</h1>
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