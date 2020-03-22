import { Box, Color, Text } from 'ink'
import React, { ReactNode, useMemo } from 'react'
import { DoctorReport } from '../doctors'

const Header = React.memo((props) => (
  <Box marginY={1}>
    <Text bold>{props.children}</Text>
  </Box>
))
Header.displayName = 'Header'

enum InformationType {
  Success,
  Warning,
  Error,
}

interface InformationProps {
  type: InformationType
  children: ReactNode
}

const Information = React.memo<InformationProps>((props) => {
  const indicator = useMemo(() => {
    const { type } = props

    if (type === InformationType.Success) {
      return <Color green>✔</Color>
    }

    if (type === InformationType.Warning) {
      return (
        <Color yellow>
          <Text bold>!</Text>
        </Color>
      )
    }

    if (type === InformationType.Error) {
      return <Color red>✖</Color>
    }
  }, [props])

  return (
    <Box marginLeft={2}>
      <Text>
        {indicator} {props.children}
      </Text>
    </Box>
  )
})
Information.displayName = 'Information'

interface DoctorReportViewProps {
  report: DoctorReport
  name?: string
}

export const DoctorReportView = React.memo<DoctorReportViewProps>(
  ({ report, name }) => (
    <>
      {name && <Header>{name}</Header>}

      {report.errors.length === 0 && report.warnings.length === 0 && (
        <Information type={InformationType.Success}>
          Everything is OK
        </Information>
      )}

      {report.errors.length > 0 &&
        report.errors.map((error) => (
          <Information key={error} type={InformationType.Error}>
            {error}
          </Information>
        ))}

      {report.warnings.length > 0 &&
        report.warnings.map((warning) => (
          <Information key={warning} type={InformationType.Warning}>
            {warning}
          </Information>
        ))}
    </>
  )
)
DoctorReportView.displayName = 'DoctorReportView'
