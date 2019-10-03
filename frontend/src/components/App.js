import React from 'react'
import {Grid,Button,TextField} from "@material-ui/core"
import Show from "./Show.js"
import Remove from './Remove.js'
import {Route,Link} from "react-router-dom"
import axios from 'axios'
export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            productName:"",
            price:"",
            qty:"",
            data:"",
            productFetch:"",
            priceFetch:"",
            qtyFetch:""
        }
    }
    componentDidMount(){
        axios({method:"get",url:"http://127.0.0.1:5000/show"})
        .then(res=>{
            console.log(res)
            this.setState({
                data:res.data.result,
                check:true
            })
        })
        .catch(err=>alert(err))
    }
    handleChangeProductFetch=(e)=>{
        this.setState({
            productFetch:e.target.value
        })
    }
    handleChangePriceFetch=(e)=>{
        this.setState({
            priceFetch:e.target.value
        })
    }
    handleChangeQtyFetch=(e)=>{
        this.setState({
            qtyFetch:e.target.value
        })
    }
    handleClickFetch=()=>{
        console.log(this.state.qty)
        let product=""
        for(let i=0;i<this.state.data.length;i++){
            if(this.state.productFetch==this.state.data[i].product){
                product=this.state.data[i]
            }
        }
        let data={
            qty:Math.abs(Number(this.state.qtyFetch)-Number(product.qty)),
            price:this.state.priceFetch
        }
        axios({method:"post",url:`http://127.0.0.1:5000/edititem/${this.state.productFetch}`,data:data})
        .then(res=>{
            this.setState({
                data:res.data.result
            })
        })
        .catch(err=>alert(err))
    }
    handleClickDelete=(e)=>{
        console.log(e.target.id)
     let text=e.target.id
     let id=text
     console.log(id)
     axios({method:"get",url:`http://127.0.0.1:5000/delete/${id}`})
     .then(res=>{console.log(res)
        this.setState({
            data:res.data.result
        })
    })
     .catch(err=>alert(err))
    }
    handleChangeProductAdd=(e)=>{
        this.setState({
            productName:e.target.value
        })
    }
    handleChangePriceAdd=(e)=>{
        this.setState({
            price:e.target.value
        })
    }
    handleChangeQtyAdd=(e)=>{
        this.setState({
            qty:e.target.value
        })
    }
    handleClickAdd=()=>{
        let data={
            product:this.state.productName,
            price:this.state.price,
            qty:this.state.qty
        }
        axios({method:"post",url:"http://127.0.0.1:5000/additem",data:data})
        .then(res=>{
            this.setState({
                data:res.data.productsAvailable
            })
        })
        .catch(err=>alert(err))
    }
    render(){
        return(
            <Grid container justify="center">
                <Route path="/" exact render={()=>{
                    return(
                        <div style={{width:"500px",height:"1000px",border:"1px solid black"}}>
                            <div style={{width:"500px",height:"800px",border:"1px solid black"}}>
                                <Link to="/add">
                                        <Button color="primary">
                                            Add item
                                        </Button>
                                </Link>
                                <Show delete={this.handleClickDelete} data={this.state.data}/>
                            </div>
                            <Remove 
                            product={this.handleChangeProductFetch}
                            price={this.handleChangePriceFetch}
                            qty={this.handleChangeQtyFetch}
                            fetch={this.handleClickFetch}
                            />
                        </div>
                    )
                }} />
                
                <Route path="/add" render={()=>{
                    return(
                        <React.Fragment>
                            <TextField onChange={this.handleChangeProductAdd} label="Product Name"/><br/>
                            <TextField onChange={this.handleChangePriceAdd} label="Price"/><br/>
                            <TextField onChange={this.handleChangeQtyAdd} label="Qty"/><br/>
                            <Button onClick={this.handleClickAdd}>ADD</Button><br/>
                        </React.Fragment>
                    )
                }} />
            </Grid>
            
        )
    }
}