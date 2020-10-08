// Important stuff, must always be imported on a storybook file
import React, { useState } from 'react'
import { withKnobs, boolean } from '@storybook/addon-knobs/react'
import { withA11y } from '@storybook/addon-a11y'

// Apollo Imports not needed for story, just for calling data
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

// If you want to apply theme
import { MuiThemeProvider as ThemeProvider } from '@material-ui/core/styles'

// The component
import PopPrediction from './PopPrediction'

import theme from '../../themes/MainTheme'

// Story config
export default {
  title: 'Pop Predictions',
  component: PopPrediction,
  decorators: [withKnobs, withA11y],
}

const QUERY = gql`
  query popPrediction($comment: String!) {
    popPrediction(comment: $comment)
  }
`

const labels = [
  'Downvoted',
  'No Votes',
  '2-10 Votes',
  '11-50 Votes',
  '50+ Votes',
]

function getPrediction(string) {
  return labels.findIndex((val) => val === string)
}

// eslint-disable-next-line react/prop-types
const Wrapper = ({ disabled = false, width }) => {
  const [text, setText] = useState('')

  // # GRAPHQL CALL - Should be uncommented once query is finished/fixed
  const { error, data, refetch } = useQuery(QUERY, {
    variables: {
      comment: '',
    },
  })

  // if (loading) {
  //   return <div>loading...</div>
  // }
  if (error) {
    return <div>{`${error}`}</div>
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ maxWidth: width }}>
        <PopPrediction
          handlePredict={async (values) => {
            if (values.length > 0) {
              await refetch({
                comment: values,
              })
              setText(values)
            }
          }}
          prediction={
            data && text.length > 0 ?
              getPrediction(data.popPrediction.score.label) :
              0
          }
          disabled={boolean('Is Disabled', disabled)}
        />
      </div>
    </ThemeProvider>
  )
}

export const base = () => <Wrapper width={500} />
export const fullWidth = () => <Wrapper />

base.story = {
  parameters: {
    jest: ['PopPrediction.test.js'],
  },
}
