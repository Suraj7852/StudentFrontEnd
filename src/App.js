import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Students from "./component/Students";
import AddStudent from "./component/AddStudent";
import StudentModal from "./component/StudentModal";

const App = () => {
    return (
        <Router>
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
