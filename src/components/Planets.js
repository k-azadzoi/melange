import React from 'react'
import { Typography } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const PLANETS = gql`
    {
        planets {
            name
            inhabitants
            id
            image
        }
    }

`

const Planets = () => {
    const { loading, error, data } = useQuery(PLANETS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :( </p>
    return data.planets.map(({ id, name, image, inhabitants }) => (
        <div key={id}>
            <Typography>
                {name} | {inhabitants}
            </Typography>
        </div>
    ))
}

export default Planets
