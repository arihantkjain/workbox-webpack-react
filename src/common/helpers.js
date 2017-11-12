import { branch, renderComponent } from 'recompose'
import { Spinner, Error } from 'components'


export const showSpinnerWhileLoading = isLoading =>
  branch(
    isLoading,
    renderComponent(Spinner),
  )

export const showSpinnerWhileApolloLoading = () =>
  showSpinnerWhileLoading(props => props.data.loading)

export const showError = error =>
  branch(
    error,
    renderComponent(Error),
  )

export const showApolloError = () =>
  showError(props => props.data.error)
