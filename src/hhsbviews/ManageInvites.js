import React from 'react';

const TopBarStyles = {
    'position': 'relative',
    'left': '10%',
    'right': '0%',
    'top': '0%',
    'width': '40%',
    'bottom': '92.92%',
    'background': '#FFFFFF',
    'box-shadow': '0px 1px 4px rgba(0, 0, 0, 0.14)',
    'border-radius': '6px'
}

const h2Styles = {
    'left': '5%',
    'font-family': 'League Spartan',
    'font-style': 'normal',
    'font-weight': 'bold',
    'font-size': '18px',
    'line-height': '22px',
    'letter-spacing': '0.2px',
    'color': '#E91E63',
}
const TopBar = props => {
    const { title } = props
    return (
        <div style={TopBarStyles}>
            <h2 style={h2Styles}> {title}</h2>
        </div>
    )
}
const ManageInvites = props => {
    return (
        <div>
         <TopBar title={'Invitation Requests'} />
         <TopBar title={'User Invite Statistics'} />
         <div> Manage Invites </div>
        </div>
    )
  }

  export default ManageInvites;