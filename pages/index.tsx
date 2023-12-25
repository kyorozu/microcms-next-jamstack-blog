import Link from "next/link";
import { client } from "../libs/client";

type Blog = {
  id: string;
  title: string;
  body: string;
  category: {
    id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    publishedAt: string,
    revisedAt: string,
  }
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
}

export default function Home({ blog, category }: { blog: Blog[], category: Category[] }) {
  console.log('blog: ', blog);
  console.log('category: ', category);
  return (
    <div>
      <ul>
        {category.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
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

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog" });

  // カテゴリーコンテンツの取得
  const categoryData = await client.get({ endpoint: "categories" });

  return {
    props: {
      blog: data.contents,
      category: categoryData.contents
    },
  };
};
