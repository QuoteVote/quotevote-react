import React from 'react'

import VotingBoard from './VotingBoard'

export default {
  component: VotingBoard,
  title: 'Voting Board',
}

export const VotingBoardComponent = () => (
  <VotingBoard>{({ text }) => <div>{text}</div>}</VotingBoard>
)
