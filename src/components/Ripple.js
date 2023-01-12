import React from 'react'

class Ripple extends React.Component{
    render(){
        return(
            <div class="text-center ripple-container">
                <div class="lds-ripple"><div></div><div></div></div>
            </div>
        )
    }
}

export default Ripple