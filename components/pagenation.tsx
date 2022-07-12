import { Button } from "@mui/material";
import Router from "next/router";

type Props = {
  postsPerPage: number;
  totalPosts: number;
  paginate: (n: number) => void;
  currentPage: number;
};

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }: Props) => {
  // ページ番号リスト
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const Pagenate = (number: number) => {
    Router.push(`/?page=${number}`);
    paginate(number);
  };

  return (
    <>
      <nav>
        {pageNumbers.map((number) => {
          return (
            <Button
              variant={number === currentPage ? "contained" : "outlined"}
              key={number}
              onClick={() => Pagenate(number)}
            >
              <a>{number}</a>
            </Button>
          );
        })}
      </nav>
    </>
  );
};

export default Pagination;
