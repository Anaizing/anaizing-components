import React from 'react';
import PropTypes from 'prop-types';
import Example from './Example';
import Props from './Props';

//* here we are getting the component object passed down and we are destructuring it
//* to keep the calls short
const ComponentPage = ({ component }) => {
    const { name, description, props, examples } = component;

//* here we display the name, the props, the description and then a heading for any examples, 
//* if any examples exist we display them, if not we show a friendly message, and then we 
//* display a table of props, if there are props we show them and if not we just display a message
//* that the component excepts no props.
    return (
        <div className="componentpage">
            <h2>{name}</h2>
            <p>{description}</p>

            <h3>Example{examples.length > 1 && "s"}</h3> 
            {
                examples.length > 0 ?
                    examples.map(example => <Example key={example.code} example={example} componentName={name} />) :
                    "No examples exist."
            }

            <h3>Props</h3>
            {
                props ?
                    <Props props={props} /> :
                    "This component accepts no props."
            }
        </div>
    )
};

ComponentPage.propTypes = {
    component: PropTypes.object.isRequired
};

export default ComponentPage;