import Link from 'next/link'
import Image from 'next/image'

import logo from '../../../public/assets/Prague-labs-logo.svg'

export default function Header() {
  return (
    <>
      <Link href="/">
        <a title="Booking homepage">
          <Image width={201} height={35} src={logo} alt="Logo of Prague Labs"></Image>
        </a>
      </Link>
    </>
  )
}
