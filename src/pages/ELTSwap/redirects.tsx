import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { AppDispatch } from '../../state'
import { ApplicationModal, setOpenModal } from '../../state/application/actions'

// Redirects to swap but only replace the pathname
export function RedirectPathToELTSwapOnly({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: '/eltswap' }} />
}

// Redirects from the /eltswap/:outputCurrency path to the /eltswap?outputCurrency=:outputCurrency format
export function RedirectToELTSwap(props: RouteComponentProps<{ outputCurrency: string }>) {
  const {
    location: { search },
    match: {
      params: { outputCurrency }
    }
  } = props

  return (
    <Redirect
      to={{
        ...props.location,
        pathname: '/eltswap',
        search:
          search && search.length > 1
            ? `${search}&outputCurrency=${outputCurrency}`
            : `?outputCurrency=${outputCurrency}`
      }}
    />
  )
}

export function OpenClaimAddressModalAndRedirectToELTSwap(props: RouteComponentProps) {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(setOpenModal(ApplicationModal.ADDRESS_CLAIM))
  }, [dispatch])
  return <RedirectPathToELTSwapOnly {...props} />
}
