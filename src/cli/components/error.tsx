import { Color } from 'ink'
import React from 'react'

interface ErrorMessageProps {
  message: string
}

export const ErrorMessage = React.memo<ErrorMessageProps>(props => (
  <>
    <Color red>error: </Color> {props.message}
  </>
))
ErrorMessage.displayName = 'ErrorMessage'
