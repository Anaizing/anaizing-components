import React from 'react'
import PropTypes from 'prop-types'

function Label({htmlFor, label, required}) {
    return (
        <label style={{display: 'block'}} htmlFor={htmlFor} >
            {label} {required && <span style={{color: 'red'}} > *</span>}
        </label>
    )
}

Label.propTypes = {
    /** HTML ID for assosiated input */
    htmlFor: PropTypes.string.isRequired,

    /** Label text */
    label: PropTypes.string.isRequired,

    /** Display asterisk after label if true */
    required: PropTypes.bool
}

export default Label