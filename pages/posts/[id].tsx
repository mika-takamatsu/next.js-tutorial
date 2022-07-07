import Head from 'next/head'
import Layout from '../../components/layout'
import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'

type Post = {
  userId: number
  id: number
  title: string
  body: string
}

type Props = {
  post: Post
}

type Params = {
  id: string
}

const Post: NextPage<Props> = ({ post }) => {
  const {id, title, body} = post
  return (
    <Layout>
    <Head>
      <title>#{id}</title>
    </Head>
    <h1>{title}</h1>
    <p>{body}</p>
  </Layout>

  )
}

// 事前生成するページのパス(/posts/[id])を設定する
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const posts = await res.json()
  const paths = posts.map((post: Post) => `/posts/${post.id}`)
  return { 
    paths, 
    fallback: false 
    // fallback
    // false : 上記posts以外(/posts/0や/posts/101など)でアクセスした場合は404ページへ遷移する
    // true : アクセス時に、サーバーサイドで getStaticProps を呼び出して動的にページを生成する
    // 'blocking' : HTML生成後に、レスポンスが返される(レスポンスが遅い？)
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params!.id // URLのパラメータから id(空の場合あり) を取得する

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
  const post = await res.json()
  return {
    props: { post }
  }
}

export default Post