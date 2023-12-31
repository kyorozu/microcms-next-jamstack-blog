import { TocItem } from "@/types";

export const TableOfContents = ({ toc }: { toc: TocItem[] }) => {
  return (
    <div>
      <p className="TableOfContentsHead">目次</p>
      <ul>
        {toc.map(data => (
          <li key={data.id}>
            <a href={`#${data.text}`}>
              {data.text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
