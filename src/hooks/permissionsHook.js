import { useSelector } from "react-redux"

export const useHasPermission = (permission) => {
  const { data: user, loading } = useSelector(state => state.userReducer)

  if (loading) {
    return {
      allowed: false,
      loading: true
    }
  }

  if (!user) {
    return {
      allowed: false,
      loading: false
    }
  }

  const roles = user.roles ?? []
  const permissions = roles.flatMap(r => r.permissions ?? [])
  const isAdmin = roles.some(r => r.title === 'admin')

  if (isAdmin) {
    return {
      allowed: true,
      loading: false
    }
  }

  const allowed = Array.isArray(permission)
    ? permission.some(p => permissions.some(x => x.title === p))
    : permissions.some(x => x.title === permission)

  return {
    allowed,
    loading: false
  }
}
