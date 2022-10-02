import { useState } from 'react';

function ColorButton() {

    var [colorState, setColorState] = useState('btn-primary'); // ----> ['btn-primary', function(){}]

    function changeColor() {
        if( colorState === 'btn-primary' ) {
            setColorState('btn-danger');
        }
        else if( colorState === 'btn-danger') {
            setColorState('btn-primary');
        }
    }

    return (
        <button onClick={changeColor} className={ `btn ${colorState}` }>Click</button>
    )
}

export default ColorButton;