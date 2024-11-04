type HomeData = {
  title: string;
  stats: string | number;
};

export type HomeDataComponentProps = {
  data: HomeData[];
};

export type Tab = {
  id: string;
  name: string;
  icon: React.ReactNode;
  route: string;
};

export type Tabs = Tab[];

export type DropdownOptionType = {
  title: string;
  value: string | number;
};

export type TableDataItem = {
  country: { value: string };
  value: number;
};

export type CountryDataType = {
  country: { value: string };
  value: number;
  date: string;
};
