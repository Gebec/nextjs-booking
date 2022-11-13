import type { ICaravan, IResponseData } from './api/interfaces'

const Home = ({ data }: { data: IResponseData }) => {
  return (
    <div>
      {data.items.map((item: ICaravan) => (
        <div key={item.name}>{item.name}</div>
      ))}
    </div>
  )
}
export async function getStaticProps(): Promise<{ props: { data: IResponseData } }> {
  const res = await fetch('http://localhost:3000/api/data')
  const data: IResponseData = await res.json()

  return {
    props: {
      data
    }
  }
}

export default Home
