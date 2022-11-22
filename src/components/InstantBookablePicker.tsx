import Image from 'next/image'
import Select, { SingleValue } from 'react-select'
import styled from 'styled-components'

import { IconWithText, Text } from './_LayoutComponents'
import ActionIcon from '../../public/assets/Icon-Action.svg'
import { useCaravansContext } from './_context/context'

import { EInstantBookable } from '../enums/instant-bookable.enum'

export interface IInstantBookable {
  value: EInstantBookable
  label: string
}

const selectOptions: IInstantBookable[] = [
  {
    value: EInstantBookable.ALL,
    label: 'Vše'
  },
  {
    value: EInstantBookable.YES,
    label: 'Ano'
  },
  {
    value: EInstantBookable.NO,
    label: 'Ne'
  }
]

export const InstantBookablePicker = () => {
  const { setInstantBookable } = useCaravansContext()

  const onChange = (selected: SingleValue<IInstantBookable>): void => {
    if (selected) {
      setInstantBookable(selected.value)
    }
  }
  return (
    <Wrapper>
      <IconWithText>
        <Text>Okamžitá rezervace</Text>
        <Image width={20} height={20} src={ActionIcon} alt=""></Image>
      </IconWithText>
      <SelectWrapper>
        <Select
          defaultValue={selectOptions[0]}
          name="color"
          options={selectOptions}
          instanceId="instant-booking-select"
          styles={{
            indicatorSeparator: () => ({ display: 'none' }),
            control: (provided) => ({
              ...provided,
              'borderRadius': 'var(--spacing-8)',
              'border': '1px solid var(--c-beige)',
              'outline': 'none',
              'boxShadow': 'none',
              '&:hover': {
                border: '1px solid var(--c-beige)'
              }
            })
          }}
          onChange={onChange}
        />
      </SelectWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
`

const SelectWrapper = styled.div`
  position: relative;
`
