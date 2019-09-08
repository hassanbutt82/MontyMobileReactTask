import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ListClientComponent from "./user/ListClientComponent";
import AddClientComponent from "./user/AddClientComponent";
import EditClientComponent from "./user/EditClientComponent";
import React from "react";
import LoginComponent from "./user/LoginComponent";

const AppRouter = () => {
    return(
            <Router>
                    <Switch>
                        <Route path="/" exact component={LoginComponent} />
                        <Route path="/list-client" component={ListClientComponent} />
                        <Route path="/add-client" component={AddClientComponent} />
                        <Route path="/edit-client" component={EditClientComponent} />
                    </Switch>
            </Router>
    )
}

export default AppRouter;