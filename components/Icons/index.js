'use client'

import { styled } from '@mui/material/styles'
import SvgIcon from '@mui/material/SvgIcon'

const StyledSvgIcon = styled(SvgIcon)({
  width: '1em',
  height: '1em',
})

export const Calendar = (props) => (
  <StyledSvgIcon {...props} viewBox="0 0 37 36">
    <path d="M32.5 4h-2.5V1.5c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5V4h-15V1.5c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5V4h-2.5C3.7 4 0 7.7 0 12.5v19C0 36.3 3.7 40 7.5 40h25c3.8 0 7.5-3.7 7.5-7.5v-19C40 7.7 36.3 4 32.5 4zm0 31h-25c-2.5 0-4.5-2-4.5-4.5v-19C3 9 5 7 7.5 7h2.5v2.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V7h15v2.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5V7h2.5C33.5 7 35 9 35 11.5v19c0 2.5-2 4.5-4.5 4.5z" />
  </StyledSvgIcon>
)

export const Filter = (props) => (
  <StyledSvgIcon {...props} viewBox="0 0 32 32">
    <path d="M30 4H2c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 10H2c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm0 10H2c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h28c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" />
  </StyledSvgIcon>
)

export const Group = (props) => (
  <StyledSvgIcon {...props} viewBox="0 0 32 32">
    <path d="M16 16c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6zm0-10c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm0 12c-4.4 0-8 3.6-8 8v2h16v-2c0-4.4-3.6-8-8-8zm6 8H10v-.1c.1-3.3 2.7-5.9 6-5.9s5.9 2.6 6 5.9v.1z" />
  </StyledSvgIcon>
) 