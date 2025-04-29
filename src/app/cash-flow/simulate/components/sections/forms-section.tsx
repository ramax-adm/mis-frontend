import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react'
import { Alert, Box, Button, Grid } from '@mui/material'
import {
  DEFAULT_RAW_MATERIAL_FORM_VALUES,
  DEFAULT_OPERATION_FORM_VALUES,
  DEFAULT_MI_CONTROLS_FORM_VALUES,
  DEFAULT_ME_CONTROLS_FORM_VALUES,
  DEFAULT_MI_INCOMES_FORM_VALUES,
  DEFAULT_ME_INCOMES_FORM_VALUES,
  DEFAULT_MI_PRICES_FORM_VALUES,
  DEFAULT_ME_PRICES_FORM_VALUES,
  DEFAULT_PROJECTION_FORM_VALUES,
} from '@/constants/app/cash-flow'
import { RawMaterialFormRef, RawMaterialInputs } from '../forms/raw-material-form'
import { OperationFormRef, OperationInputs } from '../forms/operation-form'
import { MiFormRef, MiInputs } from '../forms/mi-controls-form'
import { MeFormRef, MeInputs } from '../forms/me-controls-form'
import { MePricesFormRef, MePricesInputs } from '../forms/me-prices-form'
import { MiPricesFormRef, MiPricesInputs } from '../forms/mi-prices-form'
import { MeIncomesFormRef, MeIncomesInputs } from '../forms/me-incomes-form'
import { MiIncomesFormRef, MiIncomesInputs } from '../forms/mi-incomes-form'
import { UseMutateAsyncFunction } from '@tanstack/react-query'
import {
  UseExportCashFlowSimulationRequest,
  UseSaveUserSimulationRequest,
  UseSimulateCashFlowRequest,
} from '@/types/mutations/cash-flow'
import { PostSimulateDataResponse } from '@/types/api/cash-flow'
import { TransitionAlert } from '@/components/Alert/transition-alert'
import {
  ProjectionControlsFormRef,
  ProjectionControlsInputs,
} from '../forms/projection-controls-form'
import { FeedbackAlertSection } from './feedback-alert-section'

export interface SimulateCashFlowFormRef {
  onResetForm: () => void
  onGetValues: () =>
    | UseSimulateCashFlowRequest
    | UseSaveUserSimulationRequest
    | UseExportCashFlowSimulationRequest
}

interface SimulateCashFlowFormProps {
  simulateCashFlow: UseMutateAsyncFunction<
    PostSimulateDataResponse,
    Error,
    UseSimulateCashFlowRequest,
    unknown
  >
  isSubmitting: boolean
  isSimulateError: boolean
  isSimulateSuccess: boolean
  isSimulateErrorMessage: Error | null
}

/**
 * Formulario Root:
 *
 * Esse componente é responsavel
 * -> Controlar os inputs dos sub-formularios
 * -> Gerenciar state de submitting e de response
 * -> Executar mutation para o backend
 */

export const SimulateCashFlowForm = forwardRef<SimulateCashFlowFormRef, SimulateCashFlowFormProps>(
  (
    { isSubmitting, simulateCashFlow, isSimulateError, isSimulateErrorMessage, isSimulateSuccess },
    ref,
  ) => {
    // refs
    const projecaoFormRef = useRef<ProjectionControlsFormRef>(null)
    const matPrimaFormRef = useRef<RawMaterialFormRef>(null)
    const operacaoFormRef = useRef<OperationFormRef>(null)
    const miFormRef = useRef<MiFormRef>(null)
    const meFormRef = useRef<MeFormRef>(null)
    const mePricesFormRef = useRef<MePricesFormRef>(null)
    const miPricesFormRef = useRef<MiPricesFormRef>(null)
    const meIncomesFormRef = useRef<MeIncomesFormRef>(null)
    const miIncomesFormRef = useRef<MiIncomesFormRef>(null)

    useImperativeHandle(ref, () => ({
      onResetForm,
      onGetValues,
    }))

    // states
    const [projecaoValores, setProjecaoValores] = useState(DEFAULT_PROJECTION_FORM_VALUES)
    const [matPrimaValores, setMatPrimaValores] = useState(DEFAULT_RAW_MATERIAL_FORM_VALUES)

    const [operacaoValores, setOperacaoValores] = useState(DEFAULT_OPERATION_FORM_VALUES)

    const [miValores, setMiValores] = useState(DEFAULT_MI_CONTROLS_FORM_VALUES)
    const [meValores, setMeValores] = useState(DEFAULT_ME_CONTROLS_FORM_VALUES)

    const [rendimentosMi, setRendimentosMi] = useState(DEFAULT_MI_INCOMES_FORM_VALUES)
    const [rendimentosMe, setRendimentosMe] = useState(DEFAULT_ME_INCOMES_FORM_VALUES)

    const [precosMi, setPrecosMi] = useState(DEFAULT_MI_PRICES_FORM_VALUES)
    const [precosMe, setPrecosMe] = useState(DEFAULT_ME_PRICES_FORM_VALUES)

    // functions
    const onSimulate = async () => {
      const data = {
        projecaoValores,
        matPrimaValores,
        operacaoValores,
        miValores,
        meValores,
        rendimentosMi,
        rendimentosMe,
        precosMi,
        precosMe,
      }

      // chamada para o axios
      await simulateCashFlow(data)
    }

    const onGetValues = ():
      | UseSimulateCashFlowRequest
      | UseSaveUserSimulationRequest
      | UseExportCashFlowSimulationRequest => {
      return {
        projecaoValores,
        matPrimaValores,
        operacaoValores,
        miValores,
        meValores,
        rendimentosMi,
        rendimentosMe,
        precosMi,
        precosMe,
      }
    }
    const onResetForm = () => {
      setProjecaoValores(DEFAULT_PROJECTION_FORM_VALUES)
      setMatPrimaValores(DEFAULT_RAW_MATERIAL_FORM_VALUES)
      setOperacaoValores(DEFAULT_OPERATION_FORM_VALUES)
      setMiValores(DEFAULT_MI_CONTROLS_FORM_VALUES)
      setMeValores(DEFAULT_ME_CONTROLS_FORM_VALUES)
      setRendimentosMi(DEFAULT_MI_INCOMES_FORM_VALUES)
      setRendimentosMe(DEFAULT_ME_INCOMES_FORM_VALUES)
      setPrecosMi(DEFAULT_MI_PRICES_FORM_VALUES)
      setPrecosMe(DEFAULT_ME_PRICES_FORM_VALUES)

      if (projecaoFormRef.current) {
        projecaoFormRef.current.resetForm()
      }
      if (matPrimaFormRef.current) {
        matPrimaFormRef.current.resetForm()
      }
      if (operacaoFormRef.current) {
        operacaoFormRef.current.resetForm()
      }
      if (miFormRef.current) {
        miFormRef.current.resetForm()
      }
      if (meFormRef.current) {
        meFormRef.current.resetForm()
      }
      if (mePricesFormRef.current) {
        mePricesFormRef.current.resetForm()
      }
      if (miPricesFormRef.current) {
        miPricesFormRef.current.resetForm()
      }
      if (meIncomesFormRef.current) {
        meIncomesFormRef.current.resetForm()
      }
      if (miIncomesFormRef.current) {
        miIncomesFormRef.current.resetForm()
      }

      onSimulate()
    }

    useEffect(() => {
      onSimulate()
    }, [
      projecaoValores,
      matPrimaValores,
      operacaoValores,
      miValores,
      meValores,
      rendimentosMi,
      rendimentosMe,
      precosMi,
      precosMe,
    ])

    return (
      <>
        {/** FORM FEEDBACK ALERTS */}
        <FeedbackAlertSection
          isError={isSimulateError}
          isSuccess={isSimulateSuccess}
          errorMessage={isSimulateErrorMessage?.message ?? ''}
          successMessage='Simulação concluida com sucesso!'
        />

        {/** CONTROLS  */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'space-between',
            width: { xs: '350px', sm: '430px', md: '820px', xl: '95%' },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', width: { xl: '350px' }, gap: 3 }}>
            <ProjectionControlsInputs
              onSimulate={onSimulate}
              isSubmitting={isSubmitting}
              setProjecaoValores={setProjecaoValores}
              ref={projecaoFormRef}
            />
            <RawMaterialInputs
              onSimulate={onSimulate}
              isSubmitting={isSubmitting}
              setMatPrimaValores={setMatPrimaValores}
              ref={matPrimaFormRef}
            />
            <OperationInputs
              onSimulate={onSimulate}
              isSubmitting={isSubmitting}
              setOperacaoValores={setOperacaoValores}
              ref={operacaoFormRef}
            />
            <MiInputs
              onSimulate={onSimulate}
              isSubmitting={isSubmitting}
              setMiValores={setMiValores}
              ref={miFormRef}
            />
            <MeInputs
              onSimulate={onSimulate}
              isSubmitting={isSubmitting}
              setMeValores={setMeValores}
              ref={meFormRef}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: { xl: '400px' }, gap: 3 }}>
            <MePricesInputs
              onSimulate={onSimulate}
              isSubmitting={isSubmitting}
              setPrecosMe={setPrecosMe}
              ref={mePricesFormRef}
            />
            <MiPricesInputs
              onSimulate={onSimulate}
              isSubmitting={isSubmitting}
              setPrecosMi={setPrecosMi}
              ref={miPricesFormRef}
            />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', width: { xl: '400px' }, gap: 3 }}>
            <MeIncomesInputs
              onSimulate={onSimulate}
              isSubmitting={isSubmitting}
              setRendimentosMe={setRendimentosMe}
              ref={meIncomesFormRef}
            />
            <MiIncomesInputs
              onSimulate={onSimulate}
              isSubmitting={isSubmitting}
              setRendimentosMi={setRendimentosMi}
              ref={miIncomesFormRef}
            />
          </Box>
        </Box>
      </>
    )
  },
)
