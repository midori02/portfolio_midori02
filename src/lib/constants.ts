export const ADMIN_UID = 'mTLZenxmFraMwlT5FMjbfPpCCaf2'

export const CONTACT_TO_EMAIL = 'midori00yabu@gmail.com'

export const ARTWORK_PORTFOLIO_URL = 'https://midori00yabu.wixsite.com/portfolio'

export const getProfileIconPath = (profile?: { image?: { path: string }[] | { path: string } }): string => {
  if (!profile?.image) return '/icon_me.svg'
  if (Array.isArray(profile.image)) {
    return profile.image[0]?.path ?? '/icon_me.svg'
  }
  return profile.image.path ?? '/icon_me.svg'
}
