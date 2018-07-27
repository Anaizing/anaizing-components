import React from 'react'
import PropTypes from 'prop-types'

/** A pretty lame component displaying the Author's name with a custom message */
function Anaizing({message}) {
    return <div>By Anaizing {message}</div>
}

Anaizing.propTypes = {
    /** Message to display */
    message: PropTypes.string
}

Anaizing.defaultProps= {
    message: 'Building Dreams'
} 

export default Anaizing