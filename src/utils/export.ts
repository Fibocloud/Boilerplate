/* eslint @typescript-eslint/no-explicit-any: off */
import dayjs from "dayjs";
import { utils, write, WorkBook } from "xlsx";
import FileSaver from "file-saver";

type ExportType<T> = (
  dataSource?: T[],
  label?: string,
  cols?: { idx: number; code: string }[]
) => Promise<void>;

const getName = (obj?: any) => {
  if ("name" in obj) {
    return obj["name"];
  }
  if ("first_name" in obj && "last_name" in obj) {
    return obj["first_name"] + " " + obj["last_name"];
  }
};

export const exportXLSX: ExportType<any> = async (
  dataSource = [],
  label = "export",
  cols = []
) =>
  new Promise((resolve, reject) => {
    let realData = [];
    for (let obj of dataSource) {
      let one = {};
      Object.entries(obj).forEach(([key, value]) => {
        if (
          key.search("_path") !== -1 ||
          key.search("_id") !== -1 ||
          key.search("_uid") !== -1 ||
          key === "id"
        ) {
          return;
        }
        if (typeof value !== "object") {
          one = {
            ...one,
            [key]: value,
          };
        } else {
          if (value && typeof value === "object") {
            one = {
              ...one,
              [`${key}_name`]: getName(value),
            };
          }
        }
      });
      realData.push(one);
    }
    dataSource = realData;

    try {
      const ws = utils.json_to_sheet(dataSource);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      if (typeof cols === "object" && cols.length > 0) {
        cols.length > 0 && addFormula(wb, dataSource, cols);
      }
      const excelBuffer = write(wb, { bookType: "xlsx", type: "array" });
      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
      });
      FileSaver.saveAs(
        data,
        `${`${label}-${dayjs().format("YYYY-MM-DD")}`}.xlsx`
      );
      resolve();
    } catch (error) {
      reject(error);
    }
  });

const addFormula = (
  wb: WorkBook,
  dataSource: any[],
  cols: { idx: number; code: string }[]
) => {
  const firstSheetName = wb.SheetNames[0];
  const sheet = wb.Sheets[firstSheetName];
  cols.map((e) => {
    const cellRef = utils.encode_cell({ c: e.idx, r: dataSource.length + 1 });
    const cell = sheet[cellRef];
    if (!cell) {
      // add new cell
      utils.sheet_add_aoa(
        sheet,
        [[{ t: "n", f: `SUM(${e.code}2:${e.code}${dataSource.length + 1})` }]],
        { origin: cellRef }
      );
    }
  });
};
