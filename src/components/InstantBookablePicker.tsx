import Image from 'next/image'
import Select, { SingleValue } from 'react-select'
import styled from 'styled-components'

import { IconWithText, Text } from './_LayoutComponents'
import ActionIcon from '../../public/assets/Icon-Action.svg'

export interface IInstantBookable {
  value: boolean
  label: string
}

const selectOptions: IInstantBookable[] = [
  {
    value: false,
    label: 'Ne'
  },
  {
    value: true,
    label: 'Ano'
  }
]

export const InstantBookablePicker = ({ onChange }: { onChange: (newValue: SingleValue<IInstantBookable>) => void }) => {
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
  padding: var(--spacing-24) var(--spacing-16);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-16);
`

const SelectWrapper = styled.div`
  position: relative;
`
