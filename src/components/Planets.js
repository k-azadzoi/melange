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

const Planets = ({ newPlanets }) => {
    const { loading, error, data } = useQuery(PLANETS)

    const renderPlanets = (planets) => {
        return planets.map(({ id, name, image, inhabitants }) => (
            <div key={id}>
                <Typography>
                    {name} | {inhabitants}
                </Typography>
            </div>
        ))
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error :( </p>

    return <div>{renderPlanets(newPlanets || data.planets)}</div>
}

export default Planets
