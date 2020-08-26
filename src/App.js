import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Students from "./component/Students";
import AddStudent from "./component/AddStudent";
import StudentModal from "./component/StudentModal";
import AppToolBar from "./component/Toolbar";

const App = () => {
    return (
        <Router>
            <AppToolBar />
            <Switch>
                <Route path="/" component={Students} exact/>
                <Route path="/addStudent" component={AddStudent}/>
                <Route path="/openStudent" component={StudentModal}/>
                <Route path="/updateStudent" component={AddStudent}/>
            </Switch>
        </Router>
    );
}

export default App;
