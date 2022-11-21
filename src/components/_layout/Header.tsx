import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'

import logo from '../../../public/assets/Prague-labs-logo.svg'

export default function Header() {
  return (
    <div>
      <Link href="/" passHref>
        <Anchor title="Booking homepage">
          <Image width={201} height={35} src={logo} alt="Logo of Prague Labs"></Image>
        </Anchor>
      </Link>
    </div>
  )
}

const Anchor = styled.a`
  display: inline-block;
`
