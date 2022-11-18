import styled from 'styled-components'

import { EBreakpoint } from '../../styles/breakpoint.enum'

export const Container = styled.div`
  box-sizing: content-box;
  padding-left: var(--spacing-16);
  padding-right: var(--spacing-16);
  max-width: var(--content-max-width);
  margin: auto;

  @media (min-width: ${EBreakpoint.MOBILE}) {
    padding-left: calc(6vw + var(--spacing-16));
    padding-right: 6vw;
  }
`

export const IconWithText = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: var(--spacing-8);
  width: max-content;
`

export const Text = styled.div`
  font-size: 1rem;
  color: var(--c-dark-grey);
  white-space: nowrap;
`
