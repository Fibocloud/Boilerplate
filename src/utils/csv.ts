import { exportXLSX } from "./export";

type tplotOptions = {
  [key: string]: any;
};

export const download = async (
  filename: string,
  tableWrapper?: HTMLElement,
  window?: Window
): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    if (!tableWrapper) {
      resolve(false);
      return;
    }

    let table = tableWrapper.querySelector("table") as HTMLTableElement;
    let keys: string[] = [];
    let rowArray = Array.from(table?.rows || []);
    Array.from(rowArray[0]?.cells).forEach((cell) => {
      keys.push(cell.innerText);
    });
    let maindata: tplotOptions[] = [];
    let i = 2;
    for (i; i < rowArray.length; i++) {
      let record: tplotOptions = {};
      let row = rowArray[i];
      let cells = Array.from(row.cells);
      let j: number = 0;
      for (j; j < cells.length; j++) {
        let cell = cells[j];
        record[keys[j]] = cell.innerText;
      }
      maindata.push(record);
    }

    await exportXLSX(maindata, filename);
    resolve(true);
  });
};
