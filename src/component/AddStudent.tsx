import React, {useState} from "react";
import {TextField} from "@material-ui/core";
import './AddStudent.css';
import Button from "@material-ui/core/Button";
import {addStudents, updateStudent} from "./axios";
import {ChildComponentProps} from "./StudentModal";
import {useHistory} from 'react-router-dom';

export interface errorType {
    name?: boolean,
    ageOfStudent?: boolean,
    rollNo?: boolean
}

const AddStudent: React.FC<ChildComponentProps> = ({location}) => {
    const history = useHistory();
    const [studentName, setStudentName] = useState("");
    const [age, setAge] = useState("");
    const [roll, setRoll] = useState("");
    const [error, setError] = useState<errorType>({} as errorType);
    const [submit, setSubmit] = useState<boolean>();

    const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        const {name, value} = event.target;
        switch (name) {
            case 'Name':
                value.length < 3 || value.length > 15 ? setError({name: true}) : setError({name: false});
                setStudentName(value);
                break;
            case 'Age':
                parseInt(value) < 3 || parseInt(value) > 19 ? setError({ageOfStudent: true}) : setError({ageOfStudent: false});
                setAge(value);
                break;
            case 'RollNo':
                parseInt(value) < 100 || parseInt(value) > 999 ? setError({rollNo: true}) : setError({rollNo: false});
                setRoll(value);
                break;
            default:
                break;
        }
    };

    const validInput = () => {
        const {name, rollNo, ageOfStudent} = error;
        if (name && studentName.length > 0 && rollNo && roll.length > 0 && ageOfStudent && age.length > 0) {
            return true;
        }
        return false;
    }

    const onSubmit = () => {
        if (validInput()) {
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
        } else {
            setError({name: true, rollNo: true, ageOfStudent: true})
            setSubmit(true);
        }
    };

    const getLabel = () => {
        if (location?.state?.id) {
            return 'UPDATE';
        }
        return 'ADD';
    }

    return (
        <div className='inputContent'>
            <div style={{marginBottom: "5%"}}>
                {getLabel()} STUDENT
            </div>
            <div className='textField'>
                <TextField
                    required
                    error={error.name}
                    label="Name"
                    name="Name"
                    variant="outlined"
                    value={studentName}
                    onChange={(event) => handleValueChange(event)}
                />
                {error.name && <span style={{color: 'red'}}>Character should be of at least 3 character and less than 15 character!</span>}
            </div>
            <div className='textField'>
                <TextField
                    label="Age"
                    name="Age"
                    required
                    error={error.ageOfStudent}
                    variant="outlined"
                    value={age}
                    onChange={(event) => handleValueChange(event)}
                />
                {error.ageOfStudent &&
                <span style={{color: 'red'}}>Age must be more than 3 years and less than 19!</span>}
            </div>
            <div className='textField'>
                <TextField
                    label="RollNo."
                    name="RollNo"
                    error={error.rollNo}
                    required
                    variant="outlined"
                    value={roll}
                    onChange={(event) => handleValueChange(event)}
                />
                {error.rollNo && <span style={{color: 'red'}}>Roll no should be of 3 digit!</span>}
            </div>
            <Button variant="contained" color="primary" onClick={() => {
                onSubmit()
            }}>
                {getLabel()}
            </Button>
            {submit ?
                <span style={{color: 'red'}}>Please fill proper input!</span>
                :
                <></>}
        </div>
    )
}

export default AddStudent;