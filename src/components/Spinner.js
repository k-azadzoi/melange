import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const styles = (theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2)
        },
    },
    loadingCircle: {
        color: '#9C4421',
        position: 'absolute',
        zIndex: '1000',
        height: '31px',
        width: '31px',
        left: '42%',
        top: '35%',
    },
});

const Spinner = ({ classes }) => {
    return (
        <div>
            <CircularProgress size={150} className={classes.loadingCircle}/>
        </div>
    )
}

export default withStyles(styles)(Spinner)