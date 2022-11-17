import { VehiclePickerTile } from './VehiclePickerTile'
import styled from 'styled-components'

import type { TVehicleType } from '../../pages/api/interfaces'

const vehicleTypes: TVehicleType[] = ['Alcove', 'BuiltIn', 'Campervan', 'Intergrated']

type TProps = {
  toggleVehicleType(type: TVehicleType): boolean
}

export const VehicleTypePicker = ({ toggleVehicleType }: TProps) => {
  return (
    <TypePickerWrapper>
      {vehicleTypes.map((type: TVehicleType): React.ReactElement => {
        return <VehiclePickerTile key={type} type={type} toggleVehicleType={toggleVehicleType} />
      })}
    </TypePickerWrapper>
  )
}

const TypePickerWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  grid-auto-flow: column;
  gap: var(--spacing-16);
`
