import { useState } from 'react';

function ColorButton() {

    var [countState, setCountState] = useState(0);

    function increaseCount() {
        setCountState(countState + 1);
    }

    return (
        <button onClick={increaseCount} className="btn btn-primary"> { countState } </button>
    )
}

export default ColorButton;