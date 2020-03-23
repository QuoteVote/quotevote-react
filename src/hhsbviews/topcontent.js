import React, { Component } from 'react';
import firebase from 'firebase';
import GridContainer from "components/Grid/GridContainer.js";
import Content from "../hhsbComponents/ContentList.js"
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomizedInputBase from 'hhsbComponents/searchBar.js'
import Pagination from "material-ui-flat-pagination";
import Slider from '@material-ui/core/Slider';
import Calendar from 'hhsbAssets/Calendar.svg'
import Filter from 'hhsbAssets/Filter.svg'
import Emoji from 'hhsbAssets/FollowingEmoji.svg'
import CustomAccordion from  "../hhsbComponents/customExpansionPanel.js"


export default class TopContent extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      posts: [],
      limit: 10,
      currentPage: 1
    };
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.queryFirebase = this.queryFirebase.bind(this);
  }
  queryFirebase = page => {
    let posts = [];
    return firebase
    .firestore()
    .collection('posts')
    .orderBy('createdAt')
    .limit(10)
    .get()
    .then(snap => {
      snap.forEach(post => {
        posts.push(post.data())
      })
    })
    .then(() => {
      this.setState({
        posts
      })
    })
  }
  componentDidMount() {
    this.queryFirebase(10)
  }
  handlePaginationChange(e) {
    console.log('pagination change', e)
  }
  handleClick(e) {
    console.log('handling click', e)
    this.setState({
      page: this.state.page + 1
    })
    return this.queryFirebase(this.state.page)
  }
  render() {
    console.log('posts', this.state.posts)
    return(
        <Card style={{"height":"800px"}} >
          <CardBody >
           <GridContainer  
               direction="row"
               justify="center"
               alignItems="center"
              >
                <GridContainer 
                  alignItems="center"  
                  direction="row"  
                  style={{"width":"50%"}}>
                  <Slider
                    value={30}                  
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"                  
                  /> 
                
                </GridContainer>
                <br></br>
                <br></br> 
               
              <GridContainer alignItems="center" justify="space-between"  direction="row"
                style={{backgroundColor:"#2A6797",boxShadow:"0 6px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",width:"75%",wrap:"nowrap"}}>  
                <h3 style={{color:"white",font:"League Spartan",fontWeight: "bold",paddingLeft:"20px",paddingBottom:"5px"}}>Trending</h3>   
                <div style={{display:'flex',justifyContent:'flex-end',flexDirection:"row"}}>
                  <CustomizedInputBase></CustomizedInputBase>
                  <img src={Calendar} style={{display:"flex",maxHeight:"40px",paddingLeft:"15px"}}/>
                  <img src={Filter} style={{display:"flex",maxHeight:"40px",paddingLeft:"15px"}}/>
                  <img src={Emoji} style={{display:"flex",maxHeight:"40px",paddingLeft:"15px",paddingRight:"15px"}}/> 
                </div>
              </GridContainer> 
            </GridContainer>
           <br></br>
           <br></br>
        <GridContainer>
          <CustomAccordion active={0}  collapses={this.state.posts} />
        </GridContainer> 
        </CardBody>
        <Pagination
          limit={10}
          offset={0}
          page={this.state.page}
          total={100}
          onChange={this.handlePaginationChange}
          onClick={(e, offset) => this.handleClick(this.state.page)}
        />
        </Card>
    )
  }
}