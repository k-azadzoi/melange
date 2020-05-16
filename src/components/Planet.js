import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import Search from './Search'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


const PLANET = gql`
    query Planet($id: uuid!){
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
}) => {
    const { loading, error, data } = useQuery(PLANET, { variables: { id } })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :(</p>

    const { name, imageUrl, inhabitants, reviews } = data.planets_by_pk

    return(
        <div>
            <Search />
            <Typography variant="h3" style={{paddingTop: '20px'}}>
                {name} 
            </Typography>

            <List >
                {reviews.map((review) => (
                    <ListItem key={review.id}> {review.body}</ListItem>
                ))}
            </List>
        </div>
    )
}

export default Planet