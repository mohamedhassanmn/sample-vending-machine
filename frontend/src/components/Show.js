import React from 'react'
import {Grid, Typography,Button} from "@material-ui/core"
import axios from 'axios'
export default class Show extends React.Component{
    constructor(props){
        super(props)
        this.state={
            check:false
        }
    }
  
    render(){
        let datas=""
        datas=this.props.data
        console.log(datas)
        return(
            <Grid>
               {datas!=""?
               (
                   datas.map((ele)=>{
                    return(
                        <Grid item style={{border:"1px solid black",width:"120px",display:"inline-block"}}>
                            <Typography>Name:{ele.product}</Typography><br/>
                            <Typography>Qty:{ele.qty}</Typography><br/>
                            <Typography>Price:{ele.price}</Typography><br/>
                            <button onClick={this.props.delete} id={ele._id.$oid}>Delete</button>
                        </Grid>
                    )
                })
               )
               :null} 
            </Grid>
        )
    }
}