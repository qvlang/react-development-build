import {
    observable,
    computed,
    autorun,
    action
} from "mobx";

export class AppState {
    @observable count = 0;
    @observable name = "jack";
    @computed get msg() {
        return `${this.name}`
    }
    @action add() {
        this.count += 1
    }
}

const appState = new AppState();

autorun(() => {
    console.log(appState.msg);
})

export default appState;