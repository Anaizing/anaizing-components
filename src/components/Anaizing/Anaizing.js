import React from 'react'
import PropTypes from 'prop-types';

function Anaizing({message}) {
    return <div>Anaizing.Design {message}</div>
}

Anaizing.propTypes = {
    /**
     * Message to display
     */
    message: PropTypes.string
}

export default Anaizing