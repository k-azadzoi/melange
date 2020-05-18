import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
    margin: 0,
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,  
  },
  gridList: {
    width: 400,
    paddingTop: 10,
    paddingBottom: 5,
  },
  title: {
      color: '#ED8936',
      fontSize: '24px'
  },
  planetGrid: {
      
  },
  subtitle: {
      fontSize: '16px',
      paddingTop: '5px'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

const PLANETS = gql`
    {
        planets(order_by: {name: asc}) {
            name
            inhabitants
            id
            imageUrl
        }
    }

`

const Planets = ({ newPlanets, classes }) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        console.log('clicked')
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
  };
    const { loading, error, data } = useQuery(PLANETS)

    const renderPlanets = (planets) => {
        return planets.map(({ id, name, imageUrl, inhabitants }) => (
            <div key={id} className={classes.root}>  
                    <Container className={classes.planetGrid} maxWidth="md">
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} md={4} >
                                <GridList cellHeight={260} spacing={1} cols={1} className={classes.gridList} >
                                    <GridListTile>
                                            <img src={imageUrl} alt={name} onClick={handleClickOpen}/>
                                        
                                        <GridListTileBar 
                                            title={name}
                                            subtitle={<span> {inhabitants} </span> }
                                            classes={{
                                                title: classes.title,
                                                subtitle: classes.subtitle
                                            }}
                                        />
                                    </GridListTile>  
                                </GridList>
                            </Grid>     
                        </Grid> 
                    </Container> 
                    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                            {name}
                        </DialogTitle>
                        <DialogContent dividers>
                        <Typography gutterBottom>
                            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                        </Typography>
                        <Typography gutterBottom>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                            lacus vel augue laoreet rutrum faucibus dolor auctor.
                        </Typography>
                        <Typography gutterBottom>
                            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                            auctor fringilla.
                        </Typography>
                        </DialogContent>
                        <DialogActions>
                        <Button autoFocus onClick={handleClose} color="primary">
                            Save changes
                        </Button>
                        </DialogActions>
                    </Dialog>                           
            </div>
        ))
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :( </p>

    return <div>{renderPlanets(newPlanets || data.planets)}</div>
}

export default withStyles(styles)(Planets)
