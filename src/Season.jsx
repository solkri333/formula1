import React, { useEffect, useState } from 'react';

function Season(props) {
    const [currentYear, setYear] = useState(props.year[0]);
    const [listItems, setListItems] = useState(null);

    useEffect(() => {
        if (currentYear) {
            console.log(currentYear);
            setListItems(props.year.map(year =>
                <div 
                    key={year} 
                    onClick={yearClcik} 
                    className="year" 
                    style={String(currentYear) === String(year) 
                        ? { textDecorationLine: 'underline', textDecorationColor: 'rgb(24, 51, 132)' }
                        : { textDecorationLine: 'none' }}>
                    {year}
                </div>
            ));
        }
    }, [currentYear]);

    const yearClcik = (e) => {
        const clickedYear = e.target.textContent;

        // Check if the clicked year is 2021 or 2022 and alert the user
        if (clickedYear === '2021' || clickedYear === '2022') {
            alert(`Data not stored yet`);
        }

        // Proceed with updating the current year and other props
        if (currentYear !== clickedYear) {
            props.setYear(clickedYear);
            setYear(clickedYear);
            props.setSeason(null);
        }
    };

    return (
        <div className="nav">
            <div className="seasons">
                {listItems}
            </div>
        </div>
    );
}

export default Season;
