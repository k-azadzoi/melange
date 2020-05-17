import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useSubscription, useMutation } from '@apollo/react-hooks'
import { withStyles } from '@material-ui/core/styles'
import Search from './Search'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    planetInfo: {
        textAlign: 'center',
    },
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
            reviews(order_by: { created_at: desc }) {
                id
                body
            }
        }
    }
`

const ADD_REVIEW = gql`
    mutation($body: String!, $id: uuid!) {
        AddReview(body: $body, id: $id) {
            affected_rows
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

    const [newReview, setNewReview] = useState('')   
    const [addReview] = useMutation(ADD_REVIEW)

    console.log(newReview)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    const { name, imageUrl, inhabitants, reviews } = data.planets_by_pk

    return(
        <div className={classes.root}>
            <Search />
            <div className={classes.planetInfo}>
                <Typography variant="h3" className={classes.planetText}>
                    {name} 
                </Typography>
                <img src={imageUrl} alt='planets'/>
            </div>
                <form type='hidden' name='review' data-netlify='true'>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12}>
                            <TextField
                                label='Enter a Review'
                                name='body'
                                variant='outlined'
                                value={newReview}
                                onChange={(e) => setNewReview(e.target.value)}
                            >
                            </TextField>
                        </Grid>
                    <Button className={classes.button} type='submit' onClick={() => {
                                    addReview({ variables: { id, body: newReview } })
                                        .then(() => setNewReview(''))
                                        .catch((e) => {
                                            setNewReview(e.message)
                                        })
                                }}>Submit</Button>
                    </Grid>
                </form>
                <Divider/>
            <List >
                {reviews.map((review) => (
                    <ListItem key={review.id}> {review.body}</ListItem>
                ))}
            </List>
           
        </div>
    )
}

export default withStyles(styles)(Planet)