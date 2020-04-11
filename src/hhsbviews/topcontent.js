import React from 'react'

import GridContainer from "mui-pro/Grid/GridContainer.js"
import Content from "../hhsbComponents/ContentList.js"
import GridItem from "mui-pro/Grid/GridItem.js"
import NavPills from "mui-pro/NavPills/NavPills.js"
import CustomAccordion from  "../hhsbComponents/customExpansionPanel.js"
import Card from "mui-pro/Card/Card.js"
import CardBody from "mui-pro/Card/CardBody.js"
import CardHeader from "mui-pro/Card/CardHeader.js"
import CustomInput from "mui-pro/CustomInput/CustomInput.js"
import Button from "mui-pro/CustomButtons/Button.js"
import { getThemeProps } from '@material-ui/styles'
import Badge from "mui-pro/Badge/Badge.js"
import CustomizedInputBase from 'hhsbComponents/searchBar.js'
import Pagination from "material-ui-flat-pagination"
import SearchIcon from '@material-ui/icons/Search'
import Slider from '@material-ui/core/Slider'
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone'
import Calendar from 'hhsbAssets/Calendar.svg'
import Filter from 'hhsbAssets/Filter.svg'
import Emoji from 'hhsbAssets/FollowingEmoji.svg'
import Box from '@material-ui/core/Box'


export default function ContentFeed() {
  let data=[
    {
      title: "Collapsible group Item #1",
      content:
            "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    },
    {
      title: "Collapsible group Item #2",
      content:
            "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    },
    {
      title: "Collapsible group Item #3",
      content:
            "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.",
    },
  ]
  const handleClick=(x)=>{
    console.log(x)
  }

  return(
    <Card style={{"height":"800px"}} >
      <CardBody >
        <GridContainer  
          direction="row"
          justify="center"
          alignItems="center"
               
        >
          <GridContainer alignItems="center"  direction="row"  style={{"width":"50%"}}>
            <Slider
              value={30}                  
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"                  
            /> 
                
          </GridContainer>
          <br></br>
          <br></br> 
               
          <GridContainer
            alignItems="center" justify="space-between"  direction="row"
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
            
          <Content MessageData={data}/>
            
          
          
        </GridContainer> 
      </CardBody>
      <Pagination
        limit={10}
        offset={0}
        total={100}
        onClick={(e, offset) => this.handleClick(offset)}
      />
    </Card>


  )


}    