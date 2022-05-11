
const express = require('express')
const path = require('path')
const urllib = require('urllib')
const teamToIDs = {

}
const app = express()
const port = 4000

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

urllib.request('http://data.nba.net/10s/prod/v1/2018/teams.json', function (err, response) {
    if (err) {
        throw err
    }
    let data = JSON.parse(response)
    let teams = data.league.standard
    for (let team of teams) {
        teamToIDs[team.urlName] = team.teamId
    }
})

let players=[]
urllib.request('http://data.nba.net/10s/prod/v1/2018/players.json', function (err, response) {
    if (err) {
        throw err
    }
    let data = JSON.parse(response)
    players = data.league.standard
})

app.get('/teams/:teamName', function (request, res) {
   
    const teamId = teamToIDs[request.params.teamName]
    let newPlayers = players.filter(player => (player.teamId === teamId && player.isActive))
    newPlayers = newPlayers.map(player => {
        return {
            firstName: player.firstName,
            lastName: player.lastName,
            jersey: player.jersey,
            position: player.pos,
            image: `https://nba-players.herokuapp.com/players/${player.lastName}/${player.firstName}`
        }
       
    })
    res.send(newPlayers)
})

app.listen(port, function () {
    console.log("Server up an running on port " + port)
})