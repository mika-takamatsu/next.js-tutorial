import type { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Layout, { siteTitle } from "../components/layout";
import Pagination from "../components/pagenation";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type HomeProps = {
  posts: Post[];
};

// ビルド時にgetStaticProps()によってpropsが作成される
const Home: NextPage<HomeProps> = ({ posts }) => {
  //現在のページ
  const [currentPage, setCurrentPage] = useState(1);

  //ページごとの投稿数
  const postsPerPage = 10;

  // Get current posts
  //ページの最後の投稿　1ページ目の場合　1×10
  const indexOfLastPost = currentPage * postsPerPage;

  //ページ最初の投稿　1ページ目の場合　10-10
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  //ページの投稿内容
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <main>
        <h2>
          {currentPage}ページ目({indexOfFirstPost + 1}~{indexOfLastPost}件表示)
        </h2>
        <ul>
          {currentPosts.map((post) => {
            return (
              <li key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>

      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} currentPage={currentPage} />
    </Layout>
  );
};

// SSG(Static Generation):HTMLの生成が一度だけ行われ、ページリクエストのたびに再利用される
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const posts = await res.json();
  return { props: { posts } };
};

export default Home;
