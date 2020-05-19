import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useSubscription, useMutation } from '@apollo/react-hooks'
import { withStyles } from '@material-ui/core/styles'
import Search from './Search'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Spinner from './Spinner'
import { useForm } from 'react-hook-form'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
		display: 'flex',
		flexDirection: 'column',
        alignItems: 'center',
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '44ch',
          },
    },
    planetInfo: {
        textAlign: 'center',
    },
    planetText: {
        paddingTop: '20px',
    },
    button: {
        marginTop: '15px',
        textAlign: 'center',
        fontWeight: 'bold',
    },
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%',
        marginTop: theme.spacing(1),
        textAlign: 'center',
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
    const { register, handleSubmit, watch, errors } = useForm()

    const [newReview, setNewReview] = useState('')   
    const [addReview] = useMutation(ADD_REVIEW)

    if (loading) return <Spinner />
    if (error) return <p>Error :(</p>

    const { name, imageUrl, inhabitants, reviews } = data.planets_by_pk

    const handleReviewSubmit = (event) => {
        addReview({
            variables: {id, body: newReview}
        })
        .then(() => setNewReview(''))
        .catch((e) =>{
            setNewReview(e.message)
        })
    }

    return(
        <Container component='main' maxWidth="xs">
            <CssBaseline />
            <Search />
            <div className={classes.root}>
                <div className={classes.planetInfo}>
                    <Typography id='planet-name' variant="h3" className={classes.planetText}>
                        {name} 
                    </Typography>
                    <img src={imageUrl} alt='planets'/>
                </div>
                <Divider />
                    <form className={classes.form} noValidate onSubmit={handleSubmit(handleReviewSubmit)}>
                        <TextField
                            label='Enter a Review'
                            name='body'
                            variant='outlined'
                            inputRef={register({ required: true })}
                            multiline
                            rows={4}
                            rowsMax={10}
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                        >
                        </TextField> 
                        <br/>
                        {errors.body && "Body is required"}
                        <Button className={classes.button} type='submit'>Submit</Button>
                    </form>
                <List >
                <Divider />
                    {reviews.map((review) => (
                        <ListItem key={review.id}> {review.body}
                        </ListItem>    
                    ))}
                </List>
            
            </div>
        </Container>
    )
}

export default withStyles(styles)(Planet)