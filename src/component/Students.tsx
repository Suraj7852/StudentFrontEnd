import React, {useEffect, useState} from "react";
import {getStudents} from "./axios";
import Student, {StudentType} from "./Student";

const Students: React.FC = () => {
    const [student, setStudent] = useState([])

    useEffect(() => {
        getStudents().then((response) => {
            setStudent(response.data);
        });
    }, [])

    return (
        <div>
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