interface IExportToCSV<T> {
  fileName: string;
  header: string[];
  items: T[];
  parseData: (data: T, index: number) => string[];
}

export const exportToCSV = <T>({
  fileName,
  header,
  items,
  parseData,
}: IExportToCSV<T>) => {
  let result: string[][] = [];
  let csvContent = "data:text/csv;charset=utf-8,";
  for (let i = 0; i < items.length; i++) {
    result[i] = parseData(items[i], i);
  }

  result = [header, ...result];

  for (let i = 0; i < result.length; i++) {
    csvContent += result[i].join(";") + "\r\n";
  }

  const encodedUri = encodeURI(csvContent);

  const link = document.createElement("a");

  link.setAttribute("href", encodedUri);
  link.setAttribute("download", fileName);

  link.click();

  return {
    result,
    csvContent,
  };
};
