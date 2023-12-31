import * as cheerio from 'cheerio';

export const renderToc = (body: string) => {
  const $ = cheerio.load(body);
  const headings = $('h1, h2, h3').toArray();
  const toc = headings.map((data) => {
    const textNode = data.children[0];
    return {
      text: textNode.type === 'text' ? textNode.data : '',
      id: data.attribs.id
    };
  });

  return toc;
};
