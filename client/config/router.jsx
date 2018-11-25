import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import TopicList from "../views/topiclist/index.jsx";
import TopicDetail from "../views/topicdetail/index.jsx";

export default class Routes extends Component {
    render () {
        return (
            <Switch>
                <Route path="/" exact  component={TopicList} />
                <Route path="/detail"  component={TopicDetail} />
            </Switch>
        )
    }
}
    
