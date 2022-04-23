import dayjs from "dayjs";
import { HTMLAttributes } from "react";

export const isEmptyDate: (date?: string | null) => boolean = (date) => {
  if (!date) return true;
  return date.startsWith("0001-01-01");
};

export const waitTime = (time: number = 100) => {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const getStr = (id?: number) => {
  if (!id) return "0";
  return id.toString();
};

export const isImage = (ext: string): boolean =>
  ext.search(/.(jpg|jpeg|png|gif)$/i) >= 0;

export const renderDate: (
  date?: Date | null | string,
  time?: boolean
) => string = (date, time = false) => {
  if (!date) return "-";
  return isEmptyDate(date?.toString())
    ? "-"
    : dayjs(date).format(time ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD");
};

export const formatAPIDate = (date?: any): string => {
  if (date) return dayjs(date).format("YYYY-MM-DDTHH:mm:ssZ");
  return "";
};

export const moneyFormat: (money?: number | null) => string = (money) => {
  if (!money) return "0";
  return new Intl.NumberFormat().format(money);
};

export const tableCellFixed: (width: number) => {
  width: number;
  onCell: () => HTMLAttributes<HTMLElement>;
} = (width) => ({
  width,
  onCell: () => ({ style: { maxWidth: width, minWidth: width } }),
});

export const tablePagination: (
  params: Partial<{
    pageSize?: number;
    current?: number;
    [x: string]: any;
  }>,
  sort: any
) => { limit: number; page: number; sorter: any; [x: string]: any } = (
  { pageSize, current, ...rest },
  sort
) => {
  return {
    limit: pageSize || 20,
    page: (current || 1) - 1,
    sorter: sort,
    ...rest,
  };
};

export const findFindByAttibute: <T extends any>(params: {
  code: keyof T;
  val: any;
  list: T[];
}) => T | null = ({ val, code, list }) => {
  const index = list.findIndex((item: any) => item[code] === val);
  if (index === -1) {
    return null;
  }
  return { ...(list[index] as any) };
};

export const renderPassengerType: (val: string) => string = (val: string) => {
  const mapToStr: any = {
    ADT: "Том хүн",
    CHD: "Хүүхэд",
    INF: "Няраа",
  };
  return mapToStr[val] ? mapToStr[val] : "-";
};

export const renderHHMM: (val?: string | null) => string = (val) => {
  if (!val) {
    return "-";
  }

  return `${val.substr(0, 2)}:${val.substr(2, 2)}`;
};

export const extractHHMM: (val?: string | number | null) => number[] = (
  val
) => {
  if (!val) {
    return [0, 0];
  }
  if (typeof val === "string") {
    val = parseInt(val);
  }

  if (val <= 0) {
    return [0, 0];
  }

  return [Math.floor(val / 60), Math.floor(val % 60)];
};

export const renderDateDDMMYY: (date: any) => string = (date) => {
  if (!date) return "-";
  return dayjs(date, "DDMMYY").format("YYYY-MM-DD");
};

export const extractDateTimeDiffrenceInHHMM = (
  startDate: string,
  endDate: string
) => {
  const sDate = dayjs(startDate, "HHmm DDMMYY");
  const eDate = dayjs(endDate, "HHmm DDMMYY");
  const diff = eDate.diff(sDate, "minute");
  return extractHHMM(diff);
};

export const fileToUrl = (val: string) => {
  return `${import.meta.env.VITE_FILE_GET_URL}${val}`;
};
