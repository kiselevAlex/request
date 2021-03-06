import type { NextPage } from 'next'
import Link from 'next/link'
import withData, { Data } from '../hoc/withData'

interface Props {
  stars: number;
}

const Home: NextPage<Data<Props>> = ({ isLoading, data }) => {

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Link href="/about">About</Link>
      {isLoading && <div>Loading...</div>}
      {!isLoading && <div>stars: {data?.stars}</div>}
    </div>
  )
}

export default withData(Home, async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
})
