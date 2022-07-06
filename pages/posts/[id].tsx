import Head from 'next/head';
import Layout from '../../components/layout'

// TODO:型付け
function Post({ post }) {
  return (
    <Layout>
    <Head>
      <title>#{post.id}</title>
    </Head>
    <h1>{post.title}</h1>
    <p>{post.body}</p>
  </Layout>

  )
}

// 事前生成するページのパス(/posts/[id])を設定する
export async function getStaticPaths() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await res.json()
  const paths = posts.map(post => `/posts/${post.id}`)
  return { 
    paths, 
    fallback: false 
    // fallback
    // false : 上記posts以外(/posts/0や/posts/101など)でアクセスした場合は404ページへ遷移する
    // true : アクセス時に、サーバーサイドで getStaticProps を呼び出して動的にページを生成する
    // 'blocking' : HTML生成後に、レスポンスが返される(レスポンスが遅い？)
  }
}

// TODO:型付け
export async function getStaticProps({ params }) {
  const id = params.id // URLのパラメータから id を取得する

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const post = await res.json()
  return {
    props: { post }
  }
}

export default Post