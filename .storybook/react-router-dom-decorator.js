import React from "react";
import {createMemoryHistory} from 'history'
import {Route, Router} from 'react-router-dom'

const ReactRouterDomDecorator = story => (
    <Router history={createMemoryHistory({ initialEntries: ['/'] })}>
        <Route path="/" component={() => story()} />
    </Router>
);

export default  ReactRouterDomDecorator
