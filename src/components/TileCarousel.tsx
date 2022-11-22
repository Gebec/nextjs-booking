import { useState } from 'react'
import Image from 'next/image'

import styled from 'styled-components'

type TProps = {
  images: string[]
}

export const TileCarousel = ({ images }: TProps) => {
  const [index, setIndex] = useState(0)

  const goBack = () => {
    setIndex((index: number) => {
      return index <= 0 ? images.length - 1 : --index
    })
  }

  const goForth = () => {
    setIndex((index: number) => {
      return index >= images.length - 1 ? 0 : ++index
    })
  }

  return (
    <>
      <ButtonBack onClick={goBack}>{'<'}</ButtonBack>
      <Image src={images[index]} alt="Image of caravan" layout="fill" objectFit="cover" unoptimized={true}></Image>
      <ButtonForth onClick={goForth}>{'>'}</ButtonForth>
    </>
  )
}

const Button = styled.button`
  position: absolute;
  top: 50%;
  z-index: 100;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;

  font-size: var(--fs-24);
  font-weight: var(--fw-bold);

  color: var(--c-dark-blue);
  background-color: var(--c-white);

  outline: none;
  border: none;
  cursor: pointer;
`

const ButtonBack = styled(Button)`
  left: var(--spacing-8);
`

const ButtonForth = styled(Button)`
  right: var(--spacing-8);
`
