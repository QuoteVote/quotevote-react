import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton, SvgIcon } from '@material-ui/core'
import PropTypes from 'prop-types'
import RichTooltip from '../Chat/RichToolTip'
import SettingsContent from './SettingsContent'
import { ReactComponent as SettingsActiveSvg } from '../../assets/svg/SettingsActive.svg'
import { ReactComponent as SettingsSvg } from '../../assets/svg/Settings.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  tipColor: {
    backgroundColor: '',
    backgroundImage: '',
  },
}))
function SettingsMenu({ fontSize }) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const tipColor = '#1BB5D8'
  const tipBackgroundImage = 'linear-gradient(224.94deg, #1BB5D8 1.63%, #4066EC 97.6%)'
  const [svgIcon, setSvgIcon] = useState(SettingsSvg)

  return (
    <div className={classes.root}>
      <RichTooltip
        content={<SettingsContent setOpen={setOpen} />}
        open={open}
        placement="bottom"
        onClose={() => setOpen(false)}
        tipColor={tipColor}
        tipBackgroundImage={tipBackgroundImage}
        spacing={0}
      >
        <IconButton
          aria-label="Settings"
          color="inherit"
          onClick={() => setOpen(!open)}
          onMouseEnter={() => setSvgIcon(SettingsActiveSvg)}
          onMouseLeave={() => setSvgIcon(SettingsSvg)}
        >
          <SvgIcon
            component={svgIcon}
            fontSize={fontSize}
            viewBox="0 0 49 46"
          />
        </IconButton>
      </RichTooltip>
    </div>
  )
}
SettingsMenu.propTypes = {
  fontSize: PropTypes.any.isRequired,
}

export default SettingsMenu
