
import { useEffect, useState } from "react";
import Player from "./Player.jsx";

function Drivers(props) {
    const [infoPlayer, setInfoPlayer]= useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [listPlayer, setListPlayer] = useState(null)

    useEffect(() => {
        if (infoPlayer) {
            setListPlayer(infoPlayer ? infoPlayer.map(info =>
                <Player first={info.first} last={info.last} time={info.time} pts={info.pts} img={info.picture} rank={info.rank} team={info.team} country={info.country} tname={info.tname} laps={info.laps} /> 
            ) : null)
        }
    },[infoPlayer])
    
    useEffect(() => {
        if (!props.season) return;
        const fetchData = async () => {
            try {
                const response = await fetch('https://f1app-clex.onrender.com/ranking', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Specify JSON format
                    },
                    body: JSON.stringify({ seasonid: props.season })
                })
                if (!response.ok) {
                    throw new Error("Failed to fetch data from the API");
                }
                const data = await response.json();
              
                if (data.ranking) {
                    // setInfoPlayer(data.ranking);
                    setInfoPlayer(data.ranking)
                } else {
                    setError("No ranking data available.");
                }
            } catch (err) {
              setError("Error fetching data: " + err.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
      
        }, [props.season]);

    if (loading) {
        return <div className="spinner"></div>;
    }
    
    if (error) {
    return <div>{error}</div>;
    }
    


    return (
        <div className="drivers">
            {/* <Player first="Max" last= "Verstrappen" time="1:30" pts={24} />
            <Player first="Lewis" last= "Hamillton" time="1:30:000:000" pts={24} />
            <Player first="Charles" last= "Lecler" time="1:30:000:000" pts={24} />
            <Player /> */}
            {listPlayer}
        </div>
    )
}


export default Drivers