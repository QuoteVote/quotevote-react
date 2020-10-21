import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import moment from 'moment'

export const getGridListCols = {
  xl: 3,
  lg: 3,
  md: 3,
  sm: 2,
  xs: 1,
}

export function useWidth() {
  const theme = useTheme()
  const keys = [...theme.breakpoints.keys].reverse()
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key))
      return !output && matches ? key : output
    }, null) || 'xs'
  )
}

export function composePost(activity, theme) {
  const time = activity && formatContentDate(activity.data.created)

  const ACTIVITY_COLORS = {
    QUOTED: theme.activityCards.quoted.color,
    UP: '#55B559',
    DOWN: '#FF1100',
    COMMENTED: theme.activityCards.commented.color,
    HEARTED: '#E91E63',
    POSTED: '#020202',
  }

  switch (activity.event) {
    case 'VOTED':
      return {
        id: activity.data._id,
        AlertTitle: `${activity.data.type.toUpperCase()}VOTED`,
        color: ACTIVITY_COLORS[`${activity.data.type.toUpperCase()}`],
        AlertBody: activity.data.content.title,
        time,
        points: activity.data.type === 'up' ? `+${activity.data.points}` : `-${activity.data.points}`,
        creator: activity.data.creator,
      }
    case 'POSTED':
      return {
        id: activity.data._id,
        AlertTitle: 'CONTENT',
        color: ACTIVITY_COLORS.POSTED,
        AlertBody: activity.data.title,
        time,
        points: '',
        creator: activity.data.creator,
      }
    case 'QUOTED':
      return {
        id: activity.data._id,
        AlertTitle: activity.event,
        color: ACTIVITY_COLORS.QUOTED,
        AlertBody: `'${activity.data.quote}'`,
        time,
        points: '',
        creator: activity.data.creator,
      }
    case 'COMMENTED':
      return {
        id: activity.data._id,
        AlertTitle: activity.event,
        color: ACTIVITY_COLORS.COMMENTED,
        AlertBody: `'${activity.data.content}'`,
        time,
        points: '',
        creator: activity.data.creator,
      }
    case 'HEARTED':
      return {
        id: activity.data._id,
        AlertTitle: activity.event,
        color: ACTIVITY_COLORS.HEARTED,
        AlertBody: activity.data.content.title,
        time,
        points: '',
        creator: activity.data.creator,
      }
    default:
      break
  }
  return null
}

function formatContentDate(sDate) {
  const a = moment.utc()
  const b = moment.utc(sDate)
  const dateDiff = a.diff(b, 'days')
  if (dateDiff <= 1) {
    return moment(sDate)
      .calendar()
      .toString()
      .replace('at', '@')
  }

  return moment(sDate).format('MMM Do')
}

export const avatarOptions = {
  topType: [
    'NoHair',
    'Eyepatch',
    'Hat',
    'Hijab',
    'Turban',
    'WinterHat1',
    'WinterHat2',
    'WinterHat3',
    'WinterHat4',
    'LongHairBigHair',
    'LongHairBob',
    'LongHairBun',
    'LongHairCurly',
    'LongHairCurvy',
    'LongHairDreads',
    'LongHairFrida',
    'LongHairFro',
    'LongHairFroBand',
    'LongHairNotTooLong',
    'LongHairShavedSides',
    'LongHairMiaWallace',
    'LongHairStraight',
    'LongHairStraight2',
    'LongHairStraightStrand',
    'ShortHairDreads01',
    'ShortHairDreads02',
    'ShortHairFrizzle',
    'ShortHairShaggyMullet',
    'ShortHairShortCurly',
    'ShortHairShortFlat',
    'ShortHairShortRound',
    'ShortHairShortWaved',
    'ShortHairSides',
    'ShortHairTheCaesar',
    'ShortHairTheCaesarSidePart',
  ],
  accessoriesType: [
    'Blank',
    'Kurt',
    'Prescription01',
    'Prescription02',
    'Round',
    'Sunglasses',
    'Wayfarers',
  ],
  hatColor: [
    'Black',
    'Blue01',
    'Blue02',
    'Blue03',
    'Gray01',
    'Gray02',
    'Heather',
    'PastelBlue',
    'PastelGreen',
    'PastelOrange',
    'PastelRed',
    'PastelYellow',
    'Pink',
    'Red',
    'White',
  ],
  hairColor: [
    'Auburn',
    'Black',
    'Blonde',
    'BlondeGolden',
    'Brown',
    'BrownDark',
    'PastelPink',
    'Platinum',
    'Red',
    'SilverGray',
  ],
  facialHairType: [
    'Blank',
    'BeardMedium',
    'BeardLight',
    'BeardMajestic',
    'MoustacheFancy',
    'MoustacheMagnum',
  ],
  facialHairColor: [
    'Auburn',
    'Black',
    'Blonde',
    'BlondeGolden',
    'Brown',
    'BrownDark',
    'Platinum',
    'Red',
  ],
  clotheType: [
    'BlazerShirt',
    'BlazerSweater',
    'CollarSweater',
    'GraphicShirt',
    'Hoodie',
    'Overall',
    'ShirtCrewNeck',
    'ShirtScoopNeck',
    'ShirtVNeck',
  ],
  clotheColor: [
    'Black',
    'Blue01',
    'Blue02',
    'Blue03',
    'Gray01',
    'Gray02',
    'Heather',
    'PastelBlue',
    'PastelGreen',
    'PastelOrange',
    'PastelRed',
    'PastelYellow',
    'Pink',
    'Red',
    'White',
  ],
  graphicType: [
    'Bat',
    'Cumbia',
    'Deer',
    'Diamond',
    'Hola',
    'Pizza',
    'Resist',
    'Selena',
    'Bear',
    'SkullOutline',
    'Skull',
  ],
  eyeType: [
    'Close',
    'Cry',
    'Default',
    'Dizzy',
    'EyeRoll',
    'Happy',
    'Hearts',
    'Side',
    'Squint',
    'Surprised',
    'Wink',
    'WinkWacky',
  ],
  eyebrowType: [
    'Angry',
    'AngryNatural',
    'Default',
    'DefaultNatural',
    'FlatNatural',
    'RaisedExcited',
    'RaisedExcitedNatural',
    'SadConcerned',
    'SadConcernedNatural',
    'UnibrowNatural',
    'UpDown',
    'UpDownNatural',
  ],
  mouthType: [
    'Concerned',
    'Default',
    'Disbelief',
    'Eating',
    'Grimace',
    'Sad',
    'ScreamOpen',
    'Serious',
    'Smile',
    'Tongue',
    'Twinkle',
    'Vomit',
  ],
  skinColor: [
    'Tanned',
    'Yellow',
    'Pale',
    'Light',
    'Brown',
    'DarkBrown',
    'Black',
  ],
}
