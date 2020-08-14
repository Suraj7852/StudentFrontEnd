import React from "react";
import {Card} from "@material-ui/core";
import {removeStudent} from "./axios";
import Button from "@material-ui/core/Button";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";

export type StudentType = {
    id?: string | undefined,
    name: string,
    age: string,
    roll: string
}

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    div: {
        display: 'inline-block',
        width: '15%',
        margin: '20px',
    }
});

const Student: React.FC<StudentType> = ({id, name, age, roll}) => {
    const classes = useStyles();
    const history = useHistory();
    const openStudent = (id: string | undefined) => {
        history.push("/openStudent", {id: id});
    };

    const updateStudent = () => {
        history.push("/updateStudent", {id: id});
    }

    return (
        <div className={classes.div}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="https://www.gstatic.com/webp/gallery/1.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2">
                            Name : {name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Age : {age}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Id : {id}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Roll No. : {roll}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => {
                        removeStudent(id);
                        history.push("/");
                    }}>
                        REMOVE
                    </Button>
                    <Button size="small" color="primary" onClick={() => {
                        openStudent(id);
                    }}>
                        OPEN
                    </Button>
                    <Button size="small" color="primary" onClick={() => {
                        updateStudent()
                    }}>
                        UPDATE
                    </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Student;