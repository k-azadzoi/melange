import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import GridList from '@material-ui/core/GridList';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 400,
    paddingTop: 10,
  },
  title: {
      color: 'orange',
      fontSize: '24px'
  },
  subtitle: {
      fontSize: '16px'
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
});

const PLANETS = gql`
    {
        planets {
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
                <Grid container>
                        <Grid item xs={4}>
                        <GridList cellHeight={260} cols={1} className={classes.gridList} >
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
            </div>
        ))
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :( </p>

    return <div>{renderPlanets(newPlanets || data.planets)}</div>
}

export default withStyles(styles)(Planets)
