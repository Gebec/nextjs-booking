import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'

import { vehicleTypeDetail } from '../utils/vehicle-type-detail'
import { useCaravansContext } from './_context'

import type { TVehicleType } from '../../pages/api/interfaces'

type TProps = { type: TVehicleType }

export const VehiclePickerTile = ({ type }: TProps) => {
  const { selectedTypes, setSelectedTypes } = useCaravansContext()
  const [isActive, setStatus] = useState(false)

  const toggleVehicleType = useCallback((): void => {
    const index = selectedTypes.indexOf(type)

    if (index === -1) {
      setSelectedTypes((types: TVehicleType[]) => {
        return [...types, type]
      })
      setStatus(true)
    } else {
      setSelectedTypes((types: TVehicleType[]) => {
        types.splice(index)
        return [...types]
      })
      setStatus(false)
    }
  }, [selectedTypes, setSelectedTypes, type])

  return useMemo(() => {
    return (
      <Tile isActive={isActive} onClick={toggleVehicleType}>
        <Name>{vehicleTypeDetail[type].name}</Name>
        <Description>{vehicleTypeDetail[type].description}</Description>
      </Tile>
    )
  }, [type, toggleVehicleType, isActive])
}

const Tile = styled.div<{ isActive: boolean }>`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4);

  max-width: 10rem;

  border-radius: var(--spacing-8);
  padding: var(--spacing-12);

  cursor: pointer;

  ${(props: { isActive: boolean }) => (props.isActive ? `outline: 2px solid var(--c-green)` : `outline: 1px solid var(--c-beige)`)}
`
const Name = styled.div`
  font-size: var(--fs-16);
`

const Description = styled.p`
  font-size: var(--fs-12);
  color: var(--c-dark-grey);
`
