import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, navigate } from "@reach/router";

const TeamRoster = (props) => {
    const [roster, setRoster] = useState([]);

    const deletePlayer = (playerToDel) => {
        axios
            .delete('http://localhost:8000/api/players/' + playerToDel._id)
            .then((res) => {
                navigate('/home');
                const filteredRoster = roster.filter((player) => {
                    return player !== playerToDel;
                });
                
                setRoster(filteredRoster);
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/players")
            .then((res) => {
                setRoster(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [props.id]);

    console.log(roster);

    return (
        <div style = {{ width: '50%', margin: '0 auto' }}>
            <h1>Wanted: Kraken Wrangler</h1>
            <p>In a strange twist of fate, the NHL has allowed the newest team in the league, the Seattle Kraken, to select players from any team in any way they so choose!  This bizarre and completely unprecedented move means that you, YES YOU, the intrepid reader of this web site now have full power to determine the future of a billion dollar franchise!</p>
            <p>Your job is to comb through the current teams and build out your roster.  Note:  You will need at least the following 20 players - 4 Left Wings, 4 Right Wings, 4 Centers, 6 Defenseman, and 2 Goalies.  Show us what you can come up with!</p>
            <Link to='/teams'>DIVE INTO THE TEAMS</Link>
            <hr></hr>
            <h1>Your Roster</h1>
            <table>
                <thead>
                    <tr>
                        <td>Player Name</td>
                        <td>Position</td>
                        <td>Player Detail</td>
                        <td>Remove Player</td>
                    </tr>
                </thead>
                {roster.sort((a,b) => (a.playerName > b.playerName) ? 1 : ((b.playerName > a.playerName) ? -1 : 0)).map((player, i) => {
                    return (
                        <tbody key = {i}>
                            <tr>
                                <td>{ player.playerName }</td>
                                <td>{ player.playerPosition }</td>
                                <td><Link to = {`/players/${player.playerID}`}>Player Detail</Link></td>
                                <td>
                                    <button onClick = {(event) => {deletePlayer(player)}}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </table>
        </div>
    );
};

export default TeamRoster;