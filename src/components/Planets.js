import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'hidden',
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
 
});

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
    const { loading, error, data } = useQuery(PLANETS)

    const renderPlanets = (planets) => {
        return planets.map(({ id, name, imageUrl, inhabitants }) => (
            <div key={id} className={classes.root}>
                
                <Link to={`/planet/${id}`}>
                    <Container className={classes.planetGrid} maxWidth="md">
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} md={4}>
                                <GridList cellHeight={260} spacing={1} cols={1} className={classes.gridList} >
                                        <GridListTile>
                                                <img src={imageUrl} alt={name} />
                                    
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
                </Link>
            </div>
        ))
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :( </p>

    return <div>{renderPlanets(newPlanets || data.planets)}</div>
}

export default withStyles(styles)(Planets)
