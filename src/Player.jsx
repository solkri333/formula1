import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

function Player(props) {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/info");
      };    
    return (
        <div className="players" onClick={handleClick}>
            <div className="info">
                <div className="playerimg" style={{ backgroundImage: `url(${props.img})` }}></div>
                <div className="name">
                    <div className="first">{props.first}</div>
                    <div className="last" style={props.rank === 1 ? { color: "gold" } : props.rank === 2 ? { color: "rgb(185, 180, 180)" } : props.rank === 3 ? {
                        color: "chocolate" } : {}}> {props.last}</div>
                </div>
                <div className="country" style={{ backgroundImage: `url(${props.country})` }}></div>
                <div className="details">
                    <div>{props.time}</div>
                    <div>{props.pts} pts</div>
                    <div>{props.laps+" laps"}</div>
                </div>
                <div className="team" style={{ backgroundImage: `url(${props.team})` }}>{props.tname}</div>
            </div>
        </div>
    )
}

Player.propTypes={
    first: PropTypes.string,
    last: PropTypes.string,
    time: PropTypes.string,
    pts: PropTypes.number,
}

Player.defaultProps = {
    first: "F",
    last: "L",
    time: "00:00:000:000",
    pts: 0,
}

export default Player