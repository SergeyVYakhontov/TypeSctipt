export async function readHTMLFile(htmlFileName: string): Promise<string> {
  const response = await fetch(`./html/${htmlFileName}`);
  const htmlContent = await response.text();

  return htmlContent;
}
