import { useState } from "react";
import { useSearchParams } from 'react-router-dom';
// @mui
import {
  Stack,
  Drawer,
  Button,
  Collapse,
  Typography,
  StackProps,
  Box,
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
  EcommerceFilterCategory,
  EcommerceFilterGender,
  EcommerceFilterColor,
} from "./components";
import { ColorPicker } from 'src/components/color-utils';
import { productConfig } from 'src/config/product-options';
import { useTranslate } from 'src/locales';
import { Category, useCategories, useCategoryBrands } from 'src/hooks/useProductFilter';
import LoadingScreen from 'src/components/loading-screen';


// ----------------------------------------------------------------------

const BRAND_OPTIONS = ["Apple", "Samsung", "Xiaomi", "Honor"];


// ----------------------------------------------------------------------

const defaultValues = {
  filterBrand: [],
  filterCategories: null,
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
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { brands, isLoading: brandsLoading } = useCategoryBrands(filters.filterCategories?.id || null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);

  const getSelected = (selectedItems: string[], item: string) =>
    selectedItems.includes(item)
      ? selectedItems.filter((value) => value !== item)
      : [...selectedItems, item];

  const handleChangeCategories = (category: Category) => {
    // Allow selecting any category, whether it's a parent or child
    const newCategory = filters.filterCategories?.id === category.id ? null : category;
    
    onFiltersChange({
      ...filters,
      filterCategories: newCategory,
      filterBrand: [], // Reset brands when category changes
    });
  };

  const handleChangeBrand = (brand: { id: string; name: string }) => {
    const newBrands = filters.filterBrand.some(b => b.id === brand.id)
      ? filters.filterBrand.filter(b => b.id !== brand.id)
      : [...filters.filterBrand, brand];

    onFiltersChange({
      ...filters,
      filterBrand: newBrands,
    });
  };

  const handleChangeTag = (name: string) => {
    onFiltersChange({
      ...filters,
      filterTag: getSelected(filters.filterTag || [], name),
    });
  };

  const handleChangeStartPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    onFiltersChange({
      ...filters,
      filterPrice: {
        start: value >= 0 ? value : 0,
        end: filters.filterPrice?.end || 0
      },
    });
  };

  const handleChangeEndPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    onFiltersChange({
      ...filters,
      filterPrice: {
        start: filters.filterPrice?.start || 0,
        end: value >= 0 ? value : 0
      },
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
      filterColor: getSelected(filters.filterColor || [], name),
    });
  };

  const handleClearAll = () => {
    onFiltersChange(defaultValues);
  };
  console.log(filters.filterCategories);

  const handleExpandCategory = (categoryId: number) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const renderCategoryItem = (category: Category, level = 0, isLastChild = false) => {
    const hasChildren = category.children?.length && category.children?.length > 0;
    const isExpanded = expandedCategories.includes(category.id);
    const isSelected = filters.filterCategories?.id === category.id;

    return (
      <Stack key={category.id} spacing={1}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            position: 'relative',
            '&:before': level > 0 ? {
              content: '""',
              position: 'absolute',
              top: 0,
              left: level + 1,
              width: '2px',
              height: '100%',
              bgcolor: 'divider',
              ...(isLastChild && {
                height: '50%',
              }),
            } : {},
            '&:after': level > 0 ? {
              content: '""',
              position: 'absolute',
              top: '50%',
              left: level + 1,
              width: 16,
              height: '2px',
              bgcolor: 'divider',
            } : {},
          }}
        >
          <Stack
            direction="row"
            alignItems="center"
            onClick={() => hasChildren ? handleExpandCategory(category.id) : handleChangeCategories(category)}
            sx={{
              py: 1,
              px: 2,
              ml: level > 0 ? 3 : 0,
              borderRadius: 1,
              cursor: 'pointer',
              position: 'relative',
              typography: 'body2',
              color: 'text.secondary',
              transition: theme => theme.transitions.create('all'),
              bgcolor: isSelected ? 'primary.lighter' : 'background.neutral',
              '&:hover': {
                bgcolor: isSelected ? 'primary.lighter' : 'action.hover',
              },
              ...(isSelected && {
                color: 'primary.main',
                fontWeight: 'fontWeightBold',
              }),
            }}
          >
            {hasChildren ? (
              <Iconify
                icon={isExpanded ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
                width={16}
                sx={{
                  mr: 1,
                  color: 'text.secondary',
                  transition: theme => theme.transitions.create('transform'),
                  ...(isExpanded && {
                    transform: 'rotate(0deg)',
                  }),
                }}
              />
            ) : (
              <Box
                sx={{
                  mr: 1,
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  border: '2px solid',
                  borderColor: isSelected ? 'primary.main' : 'divider',
                  bgcolor: isSelected ? 'primary.main' : 'transparent',
                }}
              />
            )}
            
            <Box component="span" sx={{ flexGrow: 1 }}>
              {t(`categories.${category.name.toLowerCase().replace(/\s+/g, '_')}`)}
            </Box>

            {hasChildren && (
              <Box
                component="span"
                sx={{
                  px: 1,
                  py: 0.25,
                  borderRadius: 0.75,
                  typography: 'caption',
                  bgcolor: 'grey.200',
                  color: 'grey.700',
                }}
              >
                {category.children?.length}
              </Box>
            )}
          </Stack>
        </Stack>

        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Stack spacing={1}>
            {category.children?.map((child: Category, index) => 
              renderCategoryItem(
                child, 
                level + 1, 
                index === (category.children?.length || 0) - 1
              )
            )}
          </Stack>
        </Collapse>

        {isSelected && (
          <Box
            sx={{
              ml: level > 0 ? 6 : 3,
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: -16,
                width: '2px',
                height: '100%',
                bgcolor: 'divider',
              },
            }}
          >
            <EcommerceFilterBrand
              options={brands}
              filterBrand={filters.filterBrand}
              onChangeBrand={handleChangeBrand}
              loading={brandsLoading}
            />
          </Box>
        )}
      </Stack>
    );
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
      {categoriesLoading || brandsLoading ? (
        <LoadingScreen />
      ) : (
          <>
          <Block title={t('filters.categories_&_brands')}>
            <Stack spacing={1}>
              {categories.map((category: Category) => renderCategoryItem(category))}
            </Stack>
          </Block>

          <Block title={t('filters.colors')}>
            <EcommerceFilterColor
              filterColor={filters.filterColor || []}
              onChangeColor={handleChangeColor}
            />
          </Block>

          <Block title={t('filters.gender')}>
            <EcommerceFilterGender
              filterGender={filters.filterGender || ''}
              onChangeGender={handleChangeGender}
            />
          </Block>

          <Block title={t('filters.price.title')}>
            <EcommerceFilterPrice
              filterPrice={filters.filterPrice || { start: 0, end: 0 }}
              onChangeStartPrice={handleChangeStartPrice}
              onChangeEndPrice={handleChangeEndPrice}
            />
          </Block>

          

          <Block title={t('filters.tags')}>
            <EcommerceFilterTag
              filterTag={filters.filterTag || []}
              onChangeTag={handleChangeTag}
            />
          </Block>

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
        </>
      )}
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
