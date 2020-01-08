import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Chip from '../../components/Chip';

const useStyles = makeStyles({
    card: {
        margin: '5% 25%',
    },
    grow: {
        flexGrow: 1
    },
});

export default () => {
    const classes = useStyles();

    // DESC: Keep state updated with current person count
    // Type: State num
    const [currentPersonCount, updatePersonCount] = useState({ num: 0 });

    // DESC: Keep state updated with current time
    // TYPE: Stete num
    const [timeState, changeTime] = useState({ time: 0 });

    // DESC: Add latest data in History
    // TYPE: State array
    // VARIABLES:
    // xName -> X axis name
    // num -> person count
    // time -> time sample
    const [currentHistory, updateHistory] = useState({
        persons: [
            { xName: '0 sec', num: currentPersonCount.num, time: 0 }
        ]
    });

    // DESC: get latest number
    // TYPE: Function
    const updateNumHandler = () => {
        const today = new Date();
        const randPerson = Math.floor(Math.random() * 30);
        changeTime({ time: today.getSeconds() });
        updatePersonCount({ num: randPerson });
        updateHistory({
            persons: [
                ...currentHistory.persons,
                { xName: timeState.time + ' sec', num: currentPersonCount.num, time: timeState.time }
            ]
        });
        // To do: remove last item from history of more then 30 min
        //  updatePersonCountHandler();
    }

    // DESC: Remove last item from history of more then 30 min
    // TYPE; function
    const updatePersonCountHandler = () => {
        // holds maximum data in array for 30 min
        if (currentHistory.persons.length === 1384) {
            // wipe 1st item from History
        }
    }

    // DESC: trigger function after component mount
    // TYPE: Lifecycle function
    useEffect(() => {
        // Set inteval for 1.3 sec
        setInterval(function(){
            //Update Number
            updateNumHandler();
        }, 1300);
    });

    return (
        <Card className={classes.card}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        Assignment by Chirag:
                    </Typography>
                    <Chip label={`Persons in room: ${currentPersonCount.num}`} />
                </Toolbar>
            </AppBar>
            <CardContent>
                <LineChart width={800} height={400} data={currentHistory.persons}>
                    <Line type="monotone" dataKey="num" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="xName" />
                    <YAxis dataKey="num" />
                    <Tooltip />
                </LineChart>
            </CardContent>
        </Card>
    );
};
