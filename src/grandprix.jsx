
import { useEffect, useState } from 'react';
function GrandPrix(props) {
    const [loading, setLoading] = useState(true)
    const [race, setRace] = useState(null)
    const [grandPrix, setGrandprix] = useState(null)
    const [currentRace, setCurrentRace] = useState(null)
    const [error, setError] =useState(null)
    const [listItems, setListItems] = useState(null)
    
    useEffect(() => {
        if (race) {
            console.log("race")
            setGrandprix(Object.keys(race))
        }
    },[race])
    useEffect(() => {
        if (grandPrix) {
            console.log("setCurrentRace")
            setCurrentRace(grandPrix[0])
            console.log(currentRace+" current race")
        }
    }, [grandPrix])
    useEffect(() => {
        console.log("Here")
        if (currentRace) {
            props.setSeason(race[currentRace][0])
        }
    }, [currentRace])
    useEffect(() => {
        if (grandPrix) {
            console.log("Here it")
            setListItems(grandPrix.map(race =>
                <div onClick={handleClickRace} style={currentRace === race ? { background: 'green', color:'#1e1e2f'}: {}}>{race}</div>
            ))
        }
    },[currentRace])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://f1-721508493198.us-central1.run.app/grandprix', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // Specify JSON format
                    },
                    body: JSON.stringify({ year: props.year })
                })
                if (!response.ok) {
                    throw new Error("Failed to fetch data from the API");
                }
                const data = await response.json();
              
                if (data.grandprix) {
                    console.log(data.grandprix)
                    setCurrentRace(null)
                    const entries = Object.entries(data.grandprix);
                    const sortedEntries = entries.sort((a, b) => a[1][1] - b[1][1]);
                    const sortedObject = Object.fromEntries(sortedEntries);
                    setRace(sortedObject)
                    console.log(props.year)
                } else {
                    setError("No grandprix data available.");
                }
            } catch (err) {
              setError("Error fetching data: " + err.message);
            } finally {
              setLoading(false);
            }
          };
      
          fetchData();
      
        },[props.year])

    if (loading) {
        return <div className="spinner"></div>;
    }
    
    if (error) {
    return <div>{error}</div>;
    }


    
    const handleClickRace = (e) => {
        if (currentRace != e.target.textContent) {
            setCurrentRace(e.target.textContent)
            props.setSeason(race[e.target.textContent][0])
            console.log(race[e.target.textContent])
            console.log(e.target.textContent)
        }
    }
    
    return (
        <div className="grandprix">
            {listItems}
        </div>
    )
}


export default GrandPrix
