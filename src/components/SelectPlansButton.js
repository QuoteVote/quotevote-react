import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { common } from '@material-ui/core/colors'

const SelectPlansButton = withStyles(() => ({
  root: {
    color: common.white,
    borderColor: 'white',
  },
}))(Button)

export default SelectPlansButton
