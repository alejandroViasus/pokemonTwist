import React from 'react'
import prepPage from "../../../assets/svg/icons/iconPrevPage.svg"
import nextPage from "../../../assets/svg/icons/iconNextPage.svg"

function SelectorPages({ state, changePage }) {
    console.log(state)
    const pages = Math.ceil(state.cards.length / state.show)
    return (
        <div className="content-selectorPages" style={{ display: "flex" }}>

            <div className='selectorPages'>

                <img className="selector" src={prepPage} alt="selector-prev-page" onClick={() => { changePage(state.index - 1) }} />

                <div className="items-pages">
                    {state.cards.map((pokemon, i) => {
                        if (i < pages) {
                            return <div className= {( state.index-1===i) ? 'item-selection' : 'items'} onClick={() => { changePage(i + 1) }}>{i + 1} </div>
                        }

                    })}
                </div>
                <img className="selector" src={nextPage} alt="selector-prev-page" onClick={() => { changePage(state.index + 1) }} />
            </div>

        </div>
    )
}

export default SelectorPages