import React, {useEffect, useState} from 'react';
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {openStudent} from "./axios";
import {StudentType} from "./Student";
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 300,
            flexGrow: 1,
            minWidth: 300,
            transform: 'translateZ(0)',
            // The position fixed scoping doesn't work in IE 11.
            // Disable this demo to preserve the others.
            '@media all and (-ms-high-contrast: none)': {
                display: 'none',
            },
        },
        modal: {
            display: 'flex',
            padding: theme.spacing(1),
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            width: 400,
            backgroundColor: '#90bef5',
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);

export interface ChildComponentProps {
    location?: {
        state?: {
            id?: string;
        }
    }
}

const StudentModal: React.FC<ChildComponentProps> = ({location}) => {
    const history = useHistory();
    const classes = useStyles();
    const [student, setStudent] = useState<StudentType>();

    const updateStudent = () => {
        history.push("/updateStudent", {id: location?.state?.id});
    }

    useEffect(() => {
        openStudent(location?.state?.id).then((response) => {
            setStudent(response.data);
        })
    })

    return (
        <div className={classes.root}>
                <Modal
                    disablePortal
                    open
                    onClose={() => {history.push("/")}}
                    className={classes.modal}
                >
                    <div className={classes.paper}>
                        <h2 id="server-modal-title">STUDENT INFORMATION</h2>
                        <p id="server-modal-description">Name: {student?.name}</p>
                        <p id="server-modal-description">Age: {student?.age}</p>
                        <p id="server-modal-description">Id: {student?.id}</p>
                        <p id="server-modal-description">Roll No.: {student?.roll}</p>
                        <Button variant="contained" size="small" color="primary" style={{float:"left"}} onClick={() => {
                            history.push("/");
                        }}>
                            BACK
                        </Button>
                        <Button variant="contained" size="small" color="primary" style={{float:"right"}} onClick={() => {
                            updateStudent()
                        }}>
                            UPDATE
                        </Button>
                    </div>
                </Modal>
        </div>
    );
}

export default StudentModal;