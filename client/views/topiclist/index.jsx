import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import { AppState } from "../../store/app-store.js"
@inject("appState") @observer
export default class TopicList extends Component {
    render () {
        return (
            <div>this is topic-list 
                 {this.props.appState.name}
            </div>
        )
    }
} 

TopicList.propTypes = {
    appState: PropTypes.instanceOf(AppState)
}