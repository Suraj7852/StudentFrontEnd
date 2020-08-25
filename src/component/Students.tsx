import React, {useEffect, useState} from "react";
import {getStudents} from "./axios";
import Student, {StudentType} from "./Student";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const Students: React.FC = () => {
    const history = useHistory();
    const [student, setStudent] = useState([])

    useEffect(() => {
        getStudents().then((response) => {
            setStudent(response.data);
        });
    }, [])

    const onClickHandler = () => {
        history.push("/addStudent")
    }

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'column', backgroundColor: '#90bef5', margin:'1%', width:'13%'}}>
                <Button variant="outlined" color="primary" onClick={onClickHandler}>
                    ADD STUDENT
                </Button>
            </div>
            <div style={{backgroundColor: '#90bef5', margin:'1%'}}>
                {
                    student.map((item: StudentType) =>
                        (<Student id={item.id} name={item.name} age={item.age} roll={item.roll}/>)
                    )
                }
            </div>
        </div>
    )
}

export default Students;