import React, { useEffect, useState } from 'react';

import { Link } from '@reach/router';
import axios from 'axios';

const AllTeams = (props) => {

    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios
            .get('https://statsapi.web.nhl.com/api/v1/teams')
            .then((res) => {
                setTeams(res.data.teams);
            })
            .catch((err) => {
                console.log(err);
            });
        }, []);

    return (
        <div style = {{ width: '50%', margin: '0 auto' }}>
            <h1>All 31 NHL Teams</h1>
            <p>Select a team to view their roster!</p>
            <Link to = '/home'>Back to Your Roster</Link>
            <hr></hr>
            <div key= { teams.id }>
                <table>
                    <thead>
                        <tr>
                            <td>Team</td>
                            <td>Arena/Venue</td>
                            <td>First Season</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    {teams.filter(team => team.name !== "Seattle Kraken").sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((team, i) => {
                        return (
                            <tbody key = {i}>
                                <tr>
                                    <td>{ team.name }</td>
                                    <td>{ team.venue.name}</td>
                                    <td>{ team.firstYearOfPlay }</td>
                                    <td>
                                        <Link to = {`/teams/${team.id}/roster`}>Roster</Link>
                                    </td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </div>
        </div>
    )

};

export default AllTeams;