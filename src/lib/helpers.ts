export const filterInvalidData = (
  data: {
    value: number;
  }[][]
) => {
  return data[1].filter((item: { value: number }) => item.value !== null);
};

export const formatNumber = (num: number | null | undefined) => {
  if (num === null || num === undefined) return "NA";

  if (Math.abs(num) < 1000) {
    return num % 1 === 0 ? num.toString() : num.toFixed(1);
  }

  const absNum = Math.abs(num);
  let suffix = "";
  let formattedNum: number;

  if (absNum >= 1e9) {
    formattedNum = num / 1e9;
    suffix = "B";
  } else if (absNum >= 1e6) {
    formattedNum = num / 1e6;
    suffix = "M";
  } else if (absNum >= 1e3) {
    formattedNum = num / 1e3;
    suffix = "K";
  } else {
    return num.toString();
  }

  const roundedNum =
    formattedNum % 1 === 0
      ? Math.round(formattedNum).toString()
      : formattedNum.toFixed(1);

  return `${parseFloat(roundedNum)}${suffix}`;
};
