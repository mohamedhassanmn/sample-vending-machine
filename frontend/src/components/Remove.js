import React from 'react'
import { Button,TextField } from '@material-ui/core'
export default class Remove extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <React.Fragment>
                <TextField onChange={this.props.product} label="Product Name"/><br/>
                <TextField onChange={this.props.price} label="Price"/><br/>
                <TextField onChange={this.props.qty} label="Qty"/><br/>
                <Button onClick={this.props.fetch} variant="contained">Fetch</Button>
            </React.Fragment>
        )
    }
}