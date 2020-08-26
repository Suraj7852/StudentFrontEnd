import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

const AppToolBar = () => {
    const classes = useStyles();
    const history = useHistory();
    const onClickHandler = () => {
        history.push("/addStudent")
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={onClickHandler}>
                        Add student
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default AppToolBar;