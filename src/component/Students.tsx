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
            <div>
                <Button variant="outlined" color="primary" onClick={onClickHandler}>
                    ADD STUDENT
                </Button>
            </div>
            <div>
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