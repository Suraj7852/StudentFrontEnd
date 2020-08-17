import React, {useState} from "react";
import {TextField} from "@material-ui/core";
import './AddStudent.css';
import Button from "@material-ui/core/Button";
import {addStudents, updateStudent} from "./axios";
import {ChildComponentProps} from "./StudentModal";
import {useHistory} from 'react-router-dom';

const AddStudent: React.FC<ChildComponentProps> = ({location}) => {
    const history = useHistory();
    const [studentName, setStudentName] = useState("");
    const [age, setAge] = useState("");
    const [roll, setRoll] = useState("");

    const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        const {name, value} = event.target;
        switch (name) {
            case 'Age':
                setAge(value);
                break;
            case 'RollNo':
                setRoll(value);
                break;
            case 'Name':
                setStudentName(value);
                break;
            default:
                break;
        }
    };

    const onSubmit = () => {
        const data = {
            name: studentName,
            age: age,
            roll: roll
        }
        let label = getLabel();
        if (label === 'ADD') {
            addStudents(data).then(() => {
                history.push('/');
            });
        } else {
            updateStudent(location?.state?.id, data).then(() => {
                history.push("/");
            })
        }
    };

    const getLabel = () => {
        if (location?.state?.id) {
            return 'UPDATE';
        }
        return 'ADD';
    }

    return (
        <div className='detailsContactsLogin'>
            <div style={{marginBottom: "5%"}}>
                {getLabel()} STUDENT
            </div>
            <div style={{marginBottom: "5%"}}>
                <TextField
                    required
                    label="Name"
                    name="Name"
                    variant="outlined"
                    value={studentName}
                    onChange={(event) => handleValueChange(event)}
                />
            </div>
            <div style={{marginBottom: "5%"}}>
                <TextField
                    label="Age"
                    name="Age"
                    required
                    variant="outlined"
                    value={age}
                    onChange={(event) => handleValueChange(event)}
                />
            </div>
            <div style={{marginBottom: "5%"}}>
                <TextField
                    label="RollNo."
                    name="RollNo"
                    required
                    variant="outlined"
                    value={roll}
                    onChange={(event) => handleValueChange(event)}
                />
            </div>
            <Button variant="contained" color="primary"
                    style={{marginBottom: "3%", marginLeft: "13%", marginTop: "5%"}} onClick={() => {
                onSubmit()
            }}>
                {getLabel()}
            </Button>
        </div>
    )
}

export default AddStudent;