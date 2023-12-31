import Link from "next/link";
import { client } from "@/libs/client";
import { Blog, Category } from "@/types";
import { Pagination } from "@/components/Pagination";

export default function Home({ blog, category, totalCount }: { blog: Blog[], category: Category[], totalCount: number }) {
  console.log('blog: ', blog);
  console.log('category: ', category);
  console.log('totalCount: ', totalCount);
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
      <Pagination totalCount={totalCount} />
    </div>
  );
}

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
  const data = await client.get({ endpoint: "blog", queries: { offset: 0, limit: 5 } });

  // カテゴリーコンテンツの取得
  const categoryData = await client.get({ endpoint: "categories" });

  return {
    props: {
      blog: data.contents,
      category: categoryData.contents,
      totalCount: data.totalCount,
    },
  };
};
