import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';


const TopBarStyles = {
    'position': 'relative',
    'height': '100%',
    'right': '0%',
    'top': '0%',
    'width': '100%',
    'bottom': '92.92%',
    'background': '#FFFFFF',
    'box-shadow': '0px 1px 4px rgba(0, 0, 0, 0.14)',
    'border-radius': '6px'
}

const h2Styles = {
    'left': '5%',
    'padding-top': '4%',
    'text-align': 'center',
    'font-family': 'League Spartan',
    'font-style': 'normal',
    'font-weight': 'bold',
    'font-size': '18px',
    'line-height': '22px',
    'letter-spacing': '0.2px',
    'color': '#E91E63',
}
const tableStyles = {
  'position': 'absolute',
  'height': '20%',
  'width': '46%',
  'background': '#FFFFFF',
  'box-shadow': '0px 1px 4px rgba(0, 0, 0, 0.14)',
  'border-radius': '6px'
}

const tableHeaderStyles = {
  'height': '20px',

  'font-family': 'Roboto',
  'font-style': 'normal',
  'font-weight': '300',
  'font-size': '17px',
  'line-height':'20px',
  'color': '#9C27B0',
}
const dividerStyles = {
  'position': 'absolute',  
  'width': '98%',
  'background': '#D2D2D2',
  'border': '1px solid #D2D2D2'
}
const tableCellStyle = {
  'height': '16px',

  'font-family': 'Roboto',
  'font-style': 'normal',
  'font-weight': '300',
  'font-size': '14px',
  'line-height': '16px',

  'color': '#3C4858'
}
const buttonStyle = {
  'width': '100%',
  'color': '#fff',
  'background': '#FF9800',
  'border-radius': '10px',
  'margin-top': '5px',
}
const declineStyle = {
  'background': '#F44336',
  'margin-top': '5px',
  'color': '#fff',
  'width': '100%',
  'box-shadow': '0px 2px 4px rgba(244, 67, 54, 0.14), 0px 3px 1px rgba(244, 67, 54, 0.2), 0px 1px 5px rgba(244, 67, 54, 0.12)',
  'border-radius': '3px'
}
const acceptStyle = {
  'background': '#4CAF50',
  'margin-top': '5px',
  'box-shadow': '0px 2px 4px rgba(76, 175, 80, 0.14), 0px 3px 1px rgba(76, 175, 80, 0.2), 0px 1px 5px rgba(76, 175, 80, 0.12)',
  'border-radius': '3px',
  'color': '#fff',
  'width': '100%',
}
const LittleTopBar = props => {
    const { title } = props
    return (
        <div style={TopBarStyles}>
            <h2 style={h2Styles}> {title}</h2>
            <Divider />
        </div>
    )
}

const Divider = () => {
  return (
    <div style={dividerStyles}></div>
  )
}

const Table = props => {
  const { columns, rows } = props;
  return (
    <div style={tableStyles}>
      <Grid fluid>
        <Row>
          {columns.map(column => {
            return (
              <Col xs={3} md={3}>
              <h2 style={tableHeaderStyles}>{column}</h2>
            </Col>
            )
          })}
        </Row>
        <Divider />
          {rows.map(row => {
            return (
              <Row>
                {Object.keys(row).map((k, index) => {
                  if(index === 1) {
                    return (
                      <Col xs={4} md={4}>
                        <h2 style={tableCellStyle}>  {row[k]} </h2>
                      </Col>
                    )
                  }
                  else if(index === 2) {
                    return (
                      <Col xs={2} md={2}>
                        <button style={buttonStyle}>{row[k]} </button>
                      </Col>
                      )
                  }
                  else {
                    return (
                      <Col xs={2} md={2}>
                        <h2 style={tableCellStyle}> {row[k]}</h2>
                      </Col>
                    )
                  }
                  
                })}
                <Col xs={2} md={2}> 
                  <button style={acceptStyle}>Accept</button>
                </Col>
                <Col xs={2} md={2}> 
                  <button style={declineStyle}>Decline</button>
                </Col>
              </Row>
            )
          })}
          
      </Grid>
    </div>
  )
}

const InviteTable = props => {
  return (
    <div>
      <Table 
        columns={['ID', 'Email', 'Status', 'Action']} 
        rows={[{id:1, email:'jonathankolman@gmail.com', status:'NEW'}, {id:2, email:'jonathankolman@gmail.com', status:'NEW'}]}
        />
    </div>
    
  )
}
const ManageInvites = props => {
    return (
        <Grid fluid>
            <Row>
              <Col xs={6} md={6}>
                <LittleTopBar title={'Invitation Requests'} />
                <InviteTable />
              </Col>
              <Col xs={6} md={6}>
                <LittleTopBar title={'User Invite Statistics'} />
              </Col>
            </Row>
         
        </Grid>
    )
  }

  export default ManageInvites;