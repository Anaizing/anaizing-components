import React from 'react';
import PropTypes from 'prop-types';

//* Here we have an unordered list thats going to display a list of our components
//* we'll map over the array of components passed in, and display an anchor for each one
//* by convention the name of the component will be whats used in the url, so we place a # 
//* in the url followed by the name of the component
const Navigation = ({ components }) => {
    return (
        <ul className="navigation">
            {
                components.map(name => {
                    return (
                        <li key={name}>
                            <a href={`#${name}`}>{name}</a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

Navigation.propTypes = {
    components: PropTypes.array.isRequired
};

export default Navigation;