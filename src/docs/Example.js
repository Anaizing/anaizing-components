import React from 'react';
import PropTypes from 'prop-types';
import CodeExample from './CodeExample';

//* This component will display examples of our component in action

//* it holds state that keeps track of whether or not we should be showing
//* the code example
class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showCode: false };
    }
//* when you click on an anchor it will toggle setState
    toggleCode = event => {
        event.preventDefault();
        this.setState(prevState => {
            return { showCode: !prevState.showCode };
        });
    }

    //* we are dynamically requiring the example component on line 31
    //* which is useful so we dont have to manually add imports for every 
    //* component example we create. 
    render() {
        const { showCode } = this.state;
        const { code, description, name } = this.props.example;
        //* Must use CommonJS require to dynamically require because ES Modules are statically analyzable by design.
        //* meaning we cant use an import to dynamically import the example components.
        //* .default at the end because we are exporting all of our components as the default export
        const ExampleComponent = require(`./examples/${this.props.componentName}/${name}`).default; 
        //* so we display the example description if there is one and we display the example component itself
        //* then we see the click handler that will call toggleCode
        return (
            <div className="example">
                {description && <h4>{description}</h4>}

                <ExampleComponent />

                <p>
                    <a href="" onClick={this.toggleCode}>
                        {showCode ? "Hide" : "Show"} Code
          </a>
                </p>

                {showCode && <CodeExample>{code}</CodeExample>}
            </div>
        )
    }
}

Example.propTypes = {
    example: PropTypes.object.isRequired,
    componentName: PropTypes.string.isRequired
}

export default Example;