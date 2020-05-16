import React from 'react'
import { gql } from 'apollo-boost'
import { useSubscription } from '@apollo/react-hooks'
import { withStyles } from '@material-ui/core/styles'
import Search from './Search'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const styles = (theme) => ({
    planetText: {
        paddingTop: '20px',
    },
});

const PLANET = gql`
    subscription Planet($id: uuid!){
        planets_by_pk(id: $id) {
        id
        imageUrl
        inhabitants
        name
        reviews {
            id
            body
        }
        }
    }
`

const Planet = ({
    match: {
        params: { id }
    },
    classes
}) => {
    const { loading, error, data } = useSubscription(PLANET, { variables: { id } })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    const { name, imageUrl, inhabitants, reviews } = data.planets_by_pk

    return(
        <div>
            <Search />
            <Typography variant="h3" className={classes.planetText}>
                {name} 
            </Typography>
            <img src={imageUrl} alt='planets'/>

            <List >
                {reviews.map((review) => (
                    <ListItem key={review.id}> {review.body}</ListItem>
                ))}
            </List>
        </div>
    )
}

export default withStyles(styles)(Planet)