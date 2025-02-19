import { useState } from "react";
// @mui
import {
  Stack,
  Drawer,
  Button,
  Collapse,
  Typography,
  StackProps,
} from "@mui/material";
// hooks
import useResponsive from "src/hooks/useResponsive";
// config
import { NAV } from "src/config-global";
// types
import { IProductFiltersProps } from "src/types/product";
// components
import Iconify from "src/components/iconify";
//
import {
  EcommerceFilterTag,
  EcommerceFilterBrand,
  EcommerceFilterPrice,
  EcommerceFilterStock,
  EcommerceFilterRating,
  EcommerceFilterCategory,
  EcommerceFilterGender,
  EcommerceFilterColor,
} from "./components";
import { ColorPicker } from 'src/components/color-utils';
import { productConfig } from 'src/config/product-options';
import { useTranslate } from 'src/locales';


// ----------------------------------------------------------------------

const BRAND_OPTIONS = ["Apple", "Samsung", "Xiaomi", "Honor"];


// ----------------------------------------------------------------------

const defaultValues = {
  filterBrand: [BRAND_OPTIONS[1]],
  filterCategories: "",
  filterRating: null,
  filterStock: false,
  filterShipping: [],
  filterTag: [],
  filterPrice: {
    start: 0,
    end: 0,
  },
  filterGender: "",
  filterColor: [],
};

type Props = {
  mobileOpen: boolean;
  onMobileClose: VoidFunction;
  filters: IProductFiltersProps;
  onFiltersChange: (newFilters: IProductFiltersProps) => void;
};

export default function EcommerceFilters({ mobileOpen, onMobileClose, filters, onFiltersChange }: Props) {
  const isMdUp = useResponsive("up", "md");
  const { t } = useTranslate('product');

  const getSelected = (selectedItems: string[], item: string) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  const handleChangeCategories = (category: string) => {
    onFiltersChange({
      ...filters,
      filterCategories: category,
      filterBrand: [],
    });
  };

  const handleChangeBrand = (name: string) => {
    onFiltersChange({
      ...filters,
      filterBrand: getSelected(filters.filterBrand, name),
    });
  };

  const handleChangeTag = (name: string) => {
    onFiltersChange({
      ...filters,
      filterTag: getSelected(filters.filterTag, name),
    });
  };

  const handleChangeRating = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      filterRating: (event.target as HTMLInputElement).value,
    });
  };

  const handleChangeStartPrice = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onFiltersChange({
      ...filters,
      filterPrice: {
        ...filters.filterPrice,
        start: Number(event.target.value),
      },
    });
  };

  const handleChangeEndPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      filterPrice: {
        ...filters.filterPrice,
        end: Number(event.target.value),
      },
    });
  };

  const handleChangeStock = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      filterStock: event.target.checked,
    });
  };

  const handleChangeGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      filterGender: event.target.value,
    });
  };

  const handleChangeColor = (name: string) => {
    onFiltersChange({
      ...filters,
      filterColor: getSelected(filters.filterColor, name),
    });
  };

  const handleClearAll = () => {
    onFiltersChange(defaultValues);
  };

  const renderContent = (
    <Stack
      spacing={3}
      alignItems="flex-start"
      sx={{
        flexShrink: 0,
        width: { xs: 1, md: NAV.W_DRAWER },
      }}
    >
      <Block title={t('filters.category')}>
        <EcommerceFilterCategory
          options={productConfig.categories.flatMap(group => group.classify)}
          filterCategories={filters.filterCategories}
          onChangeCategories={handleChangeCategories}
        />
      </Block>

      <Block title={t('filters.brand')}>
        {filters.filterCategories && (
          <EcommerceFilterBrand
            options={productConfig.getBrandsByCategory(filters.filterCategories).map(brand => brand.name)}
            filterBrand={filters.filterBrand}
            onChangeBrand={handleChangeBrand}
          />
        )}
      </Block>

      <Block title={t('filters.colors')}>
        <EcommerceFilterColor
          options={productConfig.colors.map(color => ({
            name: t(`colors.${color.label.toLowerCase()}`),
            code: color.value,
          }))}
          filterColor={filters.filterColor}
          onChangeColor={handleChangeColor}
        />
      </Block>

      <Block title={t('filters.gender')}>
        <EcommerceFilterGender
          options={productConfig.genders.map(gender => gender.value)}
          filterGender={filters.filterGender}
          onChangeGender={handleChangeGender}
        />
      </Block>

      <Block title={t('filters.price')}>
        <EcommerceFilterPrice
          filterPrice={filters.filterPrice}
          onChangeStartPrice={handleChangeStartPrice}
          onChangeEndPrice={handleChangeEndPrice}
          sx={{ mt: 2 }}
        />
      </Block>

      <Block title={t('filters.ratings')}>
        <EcommerceFilterRating
          filterRating={filters.filterRating}
          onChangeRating={handleChangeRating}
          sx={{ mt: 2 }}
        />
      </Block>

      <Block title={t('filters.tags')}>
        <EcommerceFilterTag
          options={productConfig.tags}
          filterTag={filters.filterTag}
          onChangeTag={handleChangeTag}
        />
      </Block>

      <EcommerceFilterStock
        filterStock={filters.filterStock}
        onChangeStock={handleChangeStock}
      />

      <Button
        fullWidth
        color="inherit"
        size="large"
        variant="contained"
        startIcon={<Iconify icon="carbon:trash-can" />}
        onClick={handleClearAll}
      >
        {t('filters.clearAll')}
      </Button>
    </Stack>
  );

  return (
    <>
      {isMdUp ? (
        renderContent
      ) : (
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={onMobileClose}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              pt: 3,
              px: 3,
              width: NAV.W_DRAWER,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

interface BlockProps extends StackProps {
  title: string;
  children: React.ReactNode;
}

function Block({ title, children, ...other }: BlockProps) {
  const [checked, setChecked] = useState(true);

  const handleOpen = () => {
    setChecked((prev) => !prev);
  };

  return (
    <Stack alignItems="flex-start" sx={{ width: 1 }} {...other}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        onClick={handleOpen}
        sx={{ width: 1, cursor: "pointer" }}
      >
        <Typography variant="h6">{title}</Typography>

        <Iconify
          icon={checked ? "carbon:subtract" : "carbon:add"}
          sx={{ color: "text.secondary" }}
        />
      </Stack>

      <Collapse unmountOnExit in={checked} sx={{ px: 0.5 }}>
        {children}
      </Collapse>
    </Stack>
  );
}
