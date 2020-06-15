import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch, Redirect } from 'react-router-dom';
import AddEdit from '../../containers/addEdit';
import List from '../../containers/list';
import Details from '../../containers/details';
import PageNotFound from '../../components/pageNotFound';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/@fortawesome/fontawesome-free/js/all';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.css';

const Routing = () => (
    <BrowserRouter>
        {/* <h1>Ackee cookbook</h1> */}
        <Switch>
            <Route path="/add-edit" component={AddEdit} />
            <Route path="/details" component={Details} />
            <Route path="/" exact component={List} />
            <Route path="/page-not-found" component={PageNotFound} />
            <Redirect to="/page-not-found" />
        </Switch>
    </BrowserRouter>
);

export default Routing;