import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Seasons from "./Season.jsx";
import Title from "./head.jsx"
import Drivers from "./drivers.jsx"
import GrandPrix from "./grandprix.jsx";
import { useEffect, useState } from "react";
import info from "./info.jsx";
function App() {
  const [year, setYear] = useState(null)
  const [currentYear, setCurrentYear] = useState(null)
  const [season, setseason] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]=useState(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://f1app-clex.onrender.com/year', {
          method: 'GET',
        })
        if (!response.ok) {
          throw new Error("Failed to fetch data from the API");
        }
        const data = await response.json();
        console.log(data)
        if (data.year) {
          setYear(data.year.concat([2022, 2021]))
          setCurrentYear(data.year[0])
          console.log("Year retrieved")
        }
        else setError("No year available")
      } catch (err) {
        console.log(err.message)
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  },[])
  if (loading) {
    return <div className="spinner"></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Router>
      <Title />
      <Routes>
          <Route path='/' element={<div><Seasons year={year} setYear={setCurrentYear} setSeason={setseason} />
          <GrandPrix year={currentYear} setSeason={setseason} />
    {/* <p className="loading">Loading...</p> */}
            <Drivers season={season} /></div>} />
          <Route path="/info" element={<div className="info" style={{ fontSize: '50px', color: 'brown', display: 'flex', position: 'absolute', top: '50%', left: '20%' }}> Player Stats Here</div>}/>
      </Routes>
      </Router>
    </>
  )
}

export default App
