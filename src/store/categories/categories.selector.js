import { createSelector } from "reselect";

const selectCategoryReducer = (state) => state.categories;

export const selectCategoriesMap = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategories = createSelector(
  [selectCategoriesMap],
  (categories) =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {})
);

// export const selectCategories = (state) =>
//   state.categories.categories.reduce((acc, category) => {
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
