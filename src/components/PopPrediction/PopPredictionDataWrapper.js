import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import SweetAlert from 'react-bootstrap-sweetalert'
import PopPrediction from './PopPrediction'
import { POP_PREDICTION } from '../../graphql/query'
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
function PopPredictionDataWrapper() {
  const { error, data, refetch } = useQuery(POP_PREDICTION, {
    variables: {
      comment: '',
    },
  })

  const [text, setText] = useState('')
  const [read, setRead] = useState(false)

  const handlePredict = async (values) => {
    if (values.length > 0) {
      await refetch({
        comment: values,
      })
      setText(values)
    }
  }
  return (
    <>
      <PopPrediction
        handlePredict={handlePredict}
        prediction={
          data && text.length > 0 ?
            getPrediction(data.popPrediction.score.label) :
            0
        }
      />
      {error && !read && (
        <SweetAlert
          error
          style={{ display: 'block', top: '50%' }}
          title="Error"
          confirmBtnText="Ok"
          onConfirm={() => setRead(true)} // temporary onConfirm value
        >
          {/* We don't know what, yet let us know and we can find out */}
          Error:
          {' '}
          {error.toString()}
        </SweetAlert>
      )}
    </>
  )
}

export default PopPredictionDataWrapper
