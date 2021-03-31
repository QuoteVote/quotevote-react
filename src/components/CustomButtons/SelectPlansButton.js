import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { common } from '@material-ui/core/colors'

const SelectPlansButton = withStyles((theme) => ({
  root: {
    color: common.white,
    borderColor: 'white',
    width: 120,
    height: 40,
  },
}))(Button)

export default SelectPlansButton
