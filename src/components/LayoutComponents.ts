import styled from 'styled-components'

import { EBreakpoint } from '../../styles/breakpoint.enum'

export const Container = styled.div`
  @media (min-width: ${EBreakpoint.MOBILE}) {
    padding-left: 6vw;
    padding-right: 6vw;
  }

  & > * {
    max-width: var(--content-max-width);
    margin: auto;
    padding-left: var(--spacing-16);
    padding-right: var(--spacing-16);
  }
`
