import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link, navigate } from "@reach/router";

const PlayerDetail = (props) => {
    const [player, setPlayer] = useState(null);
    const [playerID, setPlayerID] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [playerPosition, setPlayerPosition] = useState("");

    useEffect(() => {
        axios
            .get("https://statsapi.web.nhl.com/api/v1/people/" + props.id)
            .then((res) => {
                setPlayer(res.data.people[0]);
                setPlayerID(res.data.people[0].id);
                setPlayerName(res.data.people[0].fullName);
                setPlayerPosition(res.data.people[0].primaryPosition.abbreviation);
                console.log(res.data.people[0]);
            })
            .catch((err) => {
                console.log(err);
            });
        }, [props.id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const rosterPlayer = {
            playerID: playerID,
            playerName: playerName,
            playerPosition: playerPosition,
        };

        axios
            .post('http://localhost:8000/api/players', rosterPlayer)
            .then((res) => {
                navigate('/home');
                console.log(res);
            })
            .catch((err) => {
                console.log(err.response.data.errors);
            })
    };

    return ( 
        <div style = {{ width: '50%', margin: '0 auto' }}>
            <h1>Player Detail</h1>
            { player ? 
            <div>
            <Link to={`/teams/${player.currentTeam.id}/roster`}>Back to This Player's Team</Link>{" | "}
            <Link to='/teams'>Back to All Teams</Link>{" | "}
            <Link to = '/home'>Back to Your Roster</Link>
            <hr></hr>
            <p>Name: {player.fullName}</p>
            <p>Date of Birth: {player.birthDate}</p>
            <p>Current Age: {player.currentAge}</p>
            <p>Country of Origin: {player.nationality}</p>
            <p>Height: {player.height}</p>
            <p>Weight: {player.weight}</p>
            <p>Handedness: {player.shootsCatches}</p>
            <p>Primary Position: {player.primaryPosition.abbreviation}</p>
            <hr></hr>
            <button
                    onClick = {(event) => {
                        handleSubmit(event);
                    }}
                >Add to Your Roster!</button>
            </div>
            : <p>Loading page...</p>
            }

        </div>
    );
};

export default PlayerDetail;