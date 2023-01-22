import React, { Component } from 'react';
import Loading from './Loading.gif';

class Spinner extends Component{
    render(){
        return(
            <div className="text-center">
                <img src={Loading} alt="Loading" />
            </div>
        )
    }
}
export default Spinner;