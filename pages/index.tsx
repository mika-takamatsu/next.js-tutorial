import Link from 'next/link'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import type { NextPage, GetStaticProps } from 'next'

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

type HomeProps = {
  posts: Post[]
}

// ビルド時にgetStaticProps()によってpropsが作成される
const Home: NextPage<HomeProps> = ({ posts }) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>test用</p>
      </section>

      <main>
        <h1>記事一覧</h1>
        <ul>
          {posts.map((post)=>{
            return(
              <li key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </main>
    </Layout>
  )
}

// SSG(Static Generation):HTMLの生成が一度だけ行われ、ページリクエストのたびに再利用される
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await res.json()
  return { props: { posts } }
}

export default Home