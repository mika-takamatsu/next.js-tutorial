import Link from 'next/link'
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

// ビルド時にgetStaticProps()によってpropsが作成される
// コンポーネントはpropsのキー(ここではposts)を受け取る
export default function Home({ posts }) {
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
export async function getStaticProps() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await res.json()
  return { props: { posts } }
}
