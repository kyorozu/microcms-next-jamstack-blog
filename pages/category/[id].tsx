import Link from "next/link";
import { client } from "../../libs/client";
import { Blog } from "../types";

export default function CategoryId({ blog }: { blog: Blog[] }) {
  // カテゴリーに紐付いたコンテンツがない場合に表示
  if (blog.length === 0) {
    return <div>ブログコンテンツがありません</div>;
  }
  return (
    <div>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blog/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
  const data = await client.get({ endpoint: "categories" });

  const paths = data.contents.map((content: { id: string }) => `/category/${content.id}`);
  return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context: { params: { id: string }; }) => {
  const id = context.params.id;
  const data = await client.get({ endpoint: "blog", queries: { filters: `category[equals]${id}` } });

  return {
    props: {
      blog: data.contents,
    },
  };
};
