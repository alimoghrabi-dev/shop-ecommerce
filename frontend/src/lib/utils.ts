import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string | null | undefined) {
  const words = name?.split(" ");

  const initials = words?.map((word) => word.charAt(0).toUpperCase()).join("");

  return initials;
}

export function formatNumber(num: number | undefined) {
  if (num === null) {
    return "0";
  }

  if (num! < 1000) {
    return num!.toString();
  } else if (num! < 1000000) {
    return (num! / 1000).toFixed(1) + "k";
  } else if (num! < 1000000000) {
    return (num! / 1000000).toFixed(1) + "M";
  } else {
    return (num! / 1000000000).toFixed(1) + "B";
  }
}

export function formatPrice(
  price: number | undefined,
  locale: string = "en-US",
  showCurrency: boolean = true
): string {
  const options: Intl.NumberFormatOptions = {
    style: showCurrency ? "currency" : "decimal",
    currency: "USD",
    minimumFractionDigits: showCurrency ? undefined : 2,
    maximumFractionDigits: showCurrency ? undefined : 2,
  };

  const formatter = new Intl.NumberFormat(locale, options);
  return formatter.format(price || 0);
}

export function formatDate(date: Date): string {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dateObj = new Date(date);
  const monthIndex = dateObj.getMonth();
  const day = dateObj.getDate();

  return `${months[monthIndex]} ${day}`;
}

export const formUrlQuery = ({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
};

export const removeKeysFromQuery = ({
  params,
  keys,
}: {
  params: string;
  keys: string[];
}) => {
  const currentUrl = qs.parse(params);

  keys.forEach((element) => {
    delete currentUrl[element];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    {
      skipNull: true,
    }
  );
};

export function getFirstNumberAfterDecimal(num: number): number {
  const fixedNumber = num?.toFixed(1);

  return fixedNumber as unknown as number;
}
