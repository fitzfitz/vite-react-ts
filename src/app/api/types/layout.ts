type LayoutFilterForm = {
  keyword?: string;
  categoryId?: number;
};

type LayoutDefaultState = {
  filterDrawer: boolean;
  filterForm: LayoutFilterForm;
};

export type { LayoutFilterForm, LayoutDefaultState };
