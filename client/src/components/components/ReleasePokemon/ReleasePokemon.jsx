import React from 'react'

function ReleasePokemon({ release, cancel, pokemon, trade }) {
    return (
        <div>
            <div className="trade"> coins{trade[2]} pokebals {trade[0]} paseExpedition{trade[1]} </div>
            <button onClick={release}> release</button>
            <button onClick={cancel}> cancel</button>
        </div>
    )
}

export default ReleasePokemon