import type { NextPage } from 'next'
import Link from 'next/link'
import withData, { Data } from '../../hoc/withData'

interface Props {
  stars: number;
}

const About: NextPage<Data<Props>> = ({ isLoading, data }) => {

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Link href="/">Home</Link>
      {isLoading && <div>Loading...</div>}
      {!isLoading && <div>stars: {data?.stars}</div>}
    </div>
  )
}

export default withData(About, async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
})
