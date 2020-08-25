import React,{Fragment} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Home from './components/Home';
import TodosList from './components/TodosList';
import NewProject from './components/NewProject';
import FirstTodo from './components/FirstTodo';
import AddTodo from './components/AddTodo';


export const AdminRoute = () => {
    const authUser = useSelector(function (state) { return state.authUser });
    const user = useSelector(function (state) { return state.user });
    if (sessionStorage.getItem("jwt")) {
        return (
            <Fragment>
                <Route exact path="/" component={Home} />
                <Route exact path="/todos-list" component={TodosList} />
                <Route exact path="/new-project" component={NewProject} />
                <Route exact path="/first-todo" component={FirstTodo} />
                <Route exact path="/add-todo" component={AddTodo} />
            </Fragment>
        )
    } else {
        return (
            <Redirect to={"/landing"} />
        )
    }
};

export default AdminRoute