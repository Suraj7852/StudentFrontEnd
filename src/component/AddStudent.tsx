import React, {useState} from "react";
import {TextField} from "@material-ui/core";
import './AddStudent.css';
import Button from "@material-ui/core/Button";
import {addStudents, updateStudent} from "./axios";
import {ChildComponentProps} from "./StudentModal";
import {useHistory} from 'react-router-dom';

export interface textFieldErrorType {
    name?: boolean,
    ageOfStudent?: boolean,
    rollNo?: boolean
}

const AddStudent: React.FC<ChildComponentProps> = ({location}) => {
    const history = useHistory();
    const [studentName, setStudentName] = useState("");
    const [age, setAge] = useState("");
    const [roll, setRoll] = useState("");
    const [errorType, setErrorType] = useState<textFieldErrorType>({} as textFieldErrorType);
    const [submit, setSubmit] = useState<boolean>(false);

    const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        event.preventDefault();
        const {name, value} = event.target;
        switch (name) {
            case 'Name':
                setStudentName(value);
                (value.length > 3 && value.length < 15) ?
                    setErrorType({...errorType, name: false}):
                    setErrorType({...errorType, name:true});
                break;
            case 'Age':
                (parseInt(value) > 3 && parseInt(value) < 19) ?
                    setErrorType({...errorType, ageOfStudent: false}) :
                    setErrorType({...errorType, ageOfStudent: true});
                setAge(value);
                break;
            case 'RollNo':
                (parseInt(value) > 100 && parseInt(value) < 999) ?
                    setErrorType({...errorType, rollNo: false}) :
                    setErrorType({...errorType, rollNo: true});
                setRoll(value);
                break;
            default:
                break;
        }
    };

    const validInput = () => {
    let {name, rollNo, ageOfStudent} = errorType;
        return !name && studentName.length > 0 && !rollNo && roll.length > 0 && !ageOfStudent && age.length > 0;
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
            let {name, rollNo, ageOfStudent} = errorType;
            setErrorType({name: name, rollNo: rollNo, ageOfStudent: ageOfStudent})
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
                    error={errorType.name}
                    label="Name"
                    name="Name"
                    variant="outlined"
                    value={studentName}
                    onChange={(event) => handleValueChange(event)}
                />
                {errorType.name && <span style={{color: 'red'}}>Character should be of at least 3 character and less than 15 character!</span>}
            </div>
            <div className='textField'>
                <TextField
                    label="Age"
                    name="Age"
                    required
                    error={errorType.ageOfStudent}
                    variant="outlined"
                    value={age}
                    onChange={(event) => handleValueChange(event)}
                />
                {errorType.ageOfStudent &&
                <span style={{color: 'red'}}>Age must be more than 3 years and less than 19!</span>}
            </div>
            <div className='textField'>
                <TextField
                    label="RollNo."
                    name="RollNo"
                    error={errorType.rollNo}
                    required
                    variant="outlined"
                    value={roll}
                    onChange={(event) => handleValueChange(event)}
                />
                {errorType.rollNo && <span style={{color: 'red'}}>Roll no should be of 3 digit!</span>}
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