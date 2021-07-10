import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "@reach/router";

const TeamRoster = (props) => {
    const [roster, setRoster] = useState([]);

    useEffect(() => {
        axios
            .get("https://statsapi.web.nhl.com/api/v1/teams/" + props.id + "/roster")
            .then((res) => {
                setRoster(res.data.roster);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.id]);

    return (
        <div style = {{ width: '50%', margin: '0 auto' }}>
            <h1>Team Roster</h1>
            <Link to='/teams'>Back to Teams</Link>{" | "}
            <Link to = '/home'>Back to Your Roster</Link>
            <hr></hr>
            <table>
                <thead>
                    <tr>
                        <td>Player Name</td>
                        <td>Position</td>
                        <td>Player Detail</td>
                    </tr>
                </thead>
                {roster.sort((a,b) => (a.person.fullName > b.person.fullName) ? 1 : ((b.person.fullName > a.person.fullName) ? -1 : 0)).map((player, i) => {
                    return (
                        <tbody key = {i}>
                            <tr>
                                <td>{ player.person.fullName }</td>
                                <td>{ player.position.abbreviation }</td>
                                <td><Link to = {`/players/${player.person.id}`}>Player Detail</Link></td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </div>
    );
};

export default TeamRoster;