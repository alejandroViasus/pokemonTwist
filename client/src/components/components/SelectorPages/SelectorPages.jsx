import React from 'react'

function SelectorPages({ state, changePage }) {
    console.log(state)
    const pages = Math.ceil(state.cards.length / state.show)
    return (
        <div className="content-selectorPages"  style={{display:"flex"}}>
            <div  style={{display:"flex",gap:"5px"}}>
                <div className="selector"  onClick={()=>{changePage(state.index-1)} } > (prev) </div>

                {state.cards.map((pokemon, i) => {
                    if (i < pages) {
                        return <div onClick={() => { changePage(i + 1) }}>{i + 1} </div>
                    }

                })}

                <div className="selector" onClick={()=>{changePage(state.index+1)} }> (prev) </div>
            </div>
            
        </div>
    )
}

export default SelectorPages