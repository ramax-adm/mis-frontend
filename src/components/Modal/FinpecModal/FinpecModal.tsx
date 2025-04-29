import { Box, Modal, Typography } from '@mui/material'
import React, { PropsWithChildren, ReactElement, PropsWithoutRef } from 'react'
import { TfiClose } from 'react-icons/tfi'

export interface FinpecModalProps {
  open?: boolean
  onClose: () => void
  title?: string
}

export const FinpecModal = <T extends object>({
  open,
  onClose,
  title,
  children,
  ...props
}: PropsWithChildren<FinpecModalProps>): ReactElement => {
  const WrappedComponent = React.forwardRef<HTMLDivElement, T>((props, ref) => (
    <Box {...props} ref={ref}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          width: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: 24,
          borderRadius: 2,
          backgroundColor: '#fff',
          maxHeight: '93%',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          overflowY: 'auto',
        }}
        tabIndex={-1}
      >
        <Box
          sx={{
            position: 'absolute',
            backgroundColor: 'fff',
            alignSelf: 'flex-end',
            cursor: 'pointer',
          }}
          onClick={() => onClose()}
        >
          <span style={{ display: 'inline-block', fontSize: '1.2rem' }}>
            <TfiClose />
          </span>
        </Box>
        {title && (
          <Box
            sx={{
              borderRadius: '8px 8px 0 0',
              backgroundColor: '#fff',
            }}
          >
            <Typography variant='h6' component='h2'>
              {title}
            </Typography>
          </Box>
        )}
        {children}
      </Box>
    </Box>
  ))

  WrappedComponent.displayName = `FinpecModalComponent`

  return (
    <Modal
      open={!!open}
      onClose={() => onClose()}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <WrappedComponent {...(props as PropsWithoutRef<T>)} />
    </Modal>
  )
}
