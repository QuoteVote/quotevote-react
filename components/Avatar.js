'use client'

import PropTypes from 'prop-types'
import Avatar from 'avataaars'

/**
 * Display an avataaar | https://avataaars.com/
 * @function
 * {param} props
 * returns {JSX.Element}
*/

function DisplayAvatar({
  topType,
  accessoriesType,
  hairColor,
  facialHairType,
  facialHairColor,
  clotheType,
  clotheColor,
  eyeType,
  eyebrowType,
  mouthType,
  skinColor,
  hatColor,
  height,
}) {
  const style = {
    height,
    width: height,
  }

  return (
    <Avatar
      avatarStyle="Circle"
      topType={topType}
      hatColor={hatColor}
      accessoriesType={accessoriesType}
      hairColor={hairColor}
      facialHairType={facialHairType}
      facialHairColor={facialHairColor}
      clotheType={clotheType}
      clotheColor={clotheColor}
      eyeType={eyeType}
      eyebrowType={eyebrowType}
      mouthType={mouthType}
      skinColor={skinColor}
      style={style}
    />
  )
}

DisplayAvatar.propTypes = {
  topType: PropTypes.string,
  accessoriesType: PropTypes.string,
  hairColor: PropTypes.string,
  facialHairType: PropTypes.string,
  facialHairColor: PropTypes.string,
  clotheType: PropTypes.string,
  clotheColor: PropTypes.string,
  eyeType: PropTypes.string,
  eyebrowType: PropTypes.string,
  mouthType: PropTypes.string,
  skinColor: PropTypes.string,
  hatColor: PropTypes.string,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

DisplayAvatar.defaultProps = {
  topType: 'ShortHairDreads01',
  accessoriesType: 'Prescription01',
  hairColor: 'Brown',
  facialHairType: 'Blank',
  facialHairColor: 'Brown',
  clotheType: 'Hoodie',
  clotheColor: 'Blue01',
  eyeType: 'Happy',
  eyebrowType: 'Default',
  mouthType: 'Smile',
  skinColor: 'Light',
  hatColor: 'Black',
  height: 100,
}

export default DisplayAvatar 