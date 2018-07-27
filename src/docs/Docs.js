import React from 'react';
import Navigation from './Navigation';
import ComponentPage from './ComponentPage';
import componentData from '../../config/componentData'; //* reference to the component data file that we're generating every time we start the app or save

//* Instead of pulling in a routing library we are holding the first segment of the url in STATE and
//* using hash based urls to keep it simple. Each time the url changes we're going to update state...
export default class Docs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            route: window.location.hash.substr(1)
        };
    }
//* ...which you can see here where we add a hashchange event listener 
    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({ route: window.location.hash.substr(1) })
        })
    }
//* here in render we are using the route stored in state to get our hands on the corresponding component, by 
//* convention the route and the url should match the components name, this will keep our routing very simple
//* if there is no route specified we'll just display the first component in the list
    render() {
        const { route } = this.state;
        const component = route ? componentData.filter(component => component.name === route)[0] : componentData[0];

        return (
            <div>
                <Navigation components={componentData.map(component => component.name)} />
                <ComponentPage component={component} />
            </div>
        )
    }
}