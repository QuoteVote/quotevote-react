// Important stuff, must always be imported on a storybook file
import React, { useState } from 'react'
import { withKnobs, boolean } from '@storybook/addon-knobs/react'
import { withA11y } from '@storybook/addon-a11y'

// Apollo Imports not needed for story, just for calling data
// import { useQuery } from "@apollo/react-hooks";
// import gql from "graphql-tag";

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

// const QUERY = gql`
//   query score($comment: String!) {
//     score(redditComment: $comment) {
//       comment
//       confidence
//       label
//     }
//   }
// `;

// eslint-disable-next-line react/prop-types
const Wrapper = ({ disabled = false, width }) => {
  const [prediction, setPrediction] = useState(0)

  // # GRAPHQL CALL - Should be uncommented once query is finished/fixed
  // const { loading, error, data } = useQuery(QUERY, {
  //   variables: {
  //     comment: "test",
  //   },
  // });

  // if (loading) {
  //   return <div>loading...</div>;
  // }
  // if (error) {
  //   return <div>{`${error}`}</div>;
  // }
  // console.log("data", data);

  return (
    <ThemeProvider theme={theme}>
      <div style={{ maxWidth: width }}>
        <PopPrediction
          handlePredict={() => {
            // console.log('click pop button')
            setPrediction(Math.floor(Math.random() * 5 + 1))
          }}
          prediction={prediction}
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
