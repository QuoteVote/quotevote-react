import { useDispatch } from 'react-redux'
import { tokenValidator } from 'store/user'

export default function useGuestGuard(openInvite) {
  const dispatch = useDispatch()

  return () => {
    if (!tokenValidator(dispatch)) {
      if (openInvite) openInvite(true)
      return false
    }
    return true
  }
}
