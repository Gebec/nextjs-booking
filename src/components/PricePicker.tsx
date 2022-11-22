import { useState } from 'react'
import { getTrackBackground, Range } from 'react-range'
import styled from 'styled-components'

import useDebounce from '../utils/hooks/useDebounce'
import { Text } from './_LayoutComponents'
import { useCaravansContext } from './_context/context'

import { EPricePicker } from '../enums/price-picker.enum'

export const PricePicker = () => {
  const { minPrice, maxPrice, setMinPrice, setMaxPrice } = useCaravansContext()
  const [minValue, setMinValue] = useState(EPricePicker.MIN_VALUE)
  const [maxValue, setMaxValue] = useState(EPricePicker.MAX_VALUE)

  const trackStyles: React.CSSProperties = {
    width: '100%',
    height: '2px',
    background: getTrackBackground({
      min: EPricePicker.MIN_VALUE,
      max: EPricePicker.MAX_VALUE,
      values: [minValue, maxValue],
      colors: ['var(--c-beige)', 'var(--c-green)', 'var(--c-beige)']
    })
  }

  const thumbStyles: React.CSSProperties = {
    width: 'var(--spacing-24)',
    height: 'var(--spacing-24)',
    backgroundColor: 'var(--c-green)',
    borderRadius: '50%'
  }

  useDebounce(
    () => {
      if (minValue <= EPricePicker.MIN_VALUE) {
        setMinPrice(EPricePicker.MIN_VALUE)
        setMinValue(EPricePicker.MIN_VALUE)
      } else if (minValue >= maxPrice) {
        setMinPrice(maxValue)
        setMinValue(maxValue)
      } else if (minPrice !== minValue) {
        setMinPrice(minValue)
      }
    },
    500,
    [minValue]
  )

  useDebounce(
    () => {
      if (maxValue <= minPrice) {
        setMaxPrice(minValue)
        setMaxValue(minValue)
      } else if (maxValue >= EPricePicker.MAX_VALUE) {
        setMaxPrice(EPricePicker.MAX_VALUE)
        setMaxValue(EPricePicker.MAX_VALUE)
      } else if (maxPrice !== maxValue) {
        setMaxPrice(maxValue)
      }
    },
    500,
    [maxValue]
  )

  return (
    <div>
      <Text>Cena za den</Text>
      <Picker>
        <Range
          step={EPricePicker.RANGE_STEP}
          min={EPricePicker.MIN_VALUE}
          max={EPricePicker.MAX_VALUE}
          values={[minValue, maxValue]}
          onChange={([min, max]) => {
            setMinValue(min)
            setMaxValue(max)
          }}
          renderTrack={({ props, children }) => (
            <div {...props} style={{ ...props.style, ...trackStyles }}>
              {children}
            </div>
          )}
          renderThumb={({ props }) => <div {...props} style={{ ...props.style, ...thumbStyles }} />}
        />
      </Picker>
      <ManualValues>
        <InputWrapper htmlFor="min-price-input">
          <Input
            id="min-price-input"
            type="number"
            min={0}
            max={EPricePicker.MAX_VALUE}
            value={minValue}
            onChange={(event) => setMinValue(Number(event.target.value))}
          />
          <Currency>Kč</Currency>
        </InputWrapper>
        <InputWrapper htmlFor="max-price-input">
          <Input
            id="max-price-input"
            type="number"
            min={0}
            max={EPricePicker.MAX_VALUE}
            value={maxValue}
            onChange={(event) => setMinValue(Number(event.target.value))}
          />
          <Currency>Kč</Currency>
        </InputWrapper>
      </ManualValues>
    </div>
  )
}

// Vertical padding = (height of thumb / 2) + 1rem
// Horizontal padding = thumb width / 2
const Picker = styled.div`
  position: relative;
  width: 100%;
  padding: calc(var(--spacing-12) + var(--spacing-16)) var(--spacing-12);
  text-align: center;
`

const ManualValues = styled.div`
  display: flex;
  gap: 1rem;
`

const InputWrapper = styled.label`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-16);

  padding: var(--spacing-12);
  width: 10rem;

  border: 1px solid var(--c-beige);
  border-radius: var(--spacing-8);

  &:focus,
  &:active {
    border: 1px solid var(--c-green);
  }
`

const Input = styled.input`
  border: none;
  outline: none;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`

const Currency = styled.span`
  font-size: var(--fs-16);
  color: var(--c-dark-grey);
`
