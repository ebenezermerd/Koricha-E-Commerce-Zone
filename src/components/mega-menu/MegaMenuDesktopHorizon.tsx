import { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Masonry } from '@mui/lab';
import { Link, Paper, Typography, Divider, Stack } from '@mui/material';
// types
import { ParentItemProps, MegaMenuItemProps } from './types';
// components
import Iconify from '../iconify';
//
import MenuHotProducts from './MenuHotProducts';
import MenuCarousel from './MenuCarousel';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

const ITEM_SPACING = 4;
const PARENT_ITEM_HEIGHT = 64;

type Props = {
  data: MegaMenuItemProps[];
};

export default function MegaMenuDesktopHorizon({ data, ...other }: Props) {
  return (
    <Stack direction="row" spacing={ITEM_SPACING} {...other}>
      {data.map((parent) => (
        <MegaMenuItem key={parent.title} parent={parent} />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function MegaMenuItem({ parent }: { parent: MegaMenuItemProps }) {
  const { title, path, icon, more, products, tags, children } = parent;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (children) {
    return (
      <>
        <ParentItem
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          path={path}
          title={title}
          icon={icon}
          open={open}
          hasSub
        />

        {open && (
          <Paper
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            sx={{
              p: 3,
              width: '100%',
              position: 'absolute',
              borderRadius: 2,
              top: PARENT_ITEM_HEIGHT,
              left: -ITEM_SPACING * 8,
              zIndex: (theme) => theme.zIndex.modal,
              boxShadow: (theme) => theme.customShadows.z20,
            }}
          >
            <Masonry columns={4} spacing={2} defaultColumns={3} defaultSpacing={2}>
              {children.map((list) => (
                <Stack key={list.subheader} spacing={1.25} sx={{ mb: 2.5 }}>
                  <Typography variant="subtitle1" noWrap>
                    {list.subheader}
                  </Typography>

                  {list.items.map((link) => (
                    <Link
                      key={link.title}
                      component={RouterLink}
                      to={link.path}
                      noWrap
                      underline="none"
                      sx={{
                        typography: 'body2',
                        color: 'text.primary',
                        fontSize: 13,
                        transition: (theme) => theme.transitions.create('all'),
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {link.title}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Masonry>

            <Stack spacing={3}>
              {!!more && (
                <Link
                  component={RouterLink}
                  to={more?.path}
                  sx={{ typography: 'body2', display: 'inline-flex', fontSize: 13 }}
                >
                  {more?.title}
                </Link>
              )}

              {!!products && (
                <>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <MenuCarousel products={products} numberShow={8} />
                </>
              )}

              {!!tags && (
                <>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <MenuHotProducts tags={tags} />
                </>
              )}
            </Stack>
          </Paper>
        )}
      </>
    );
  }

  return <ParentItem path={path} title={title} icon={icon} />;
}

// ----------------------------------------------------------------------

function ParentItem({ title, path = '', icon, open, hasSub, ...other }: ParentItemProps) {
  const activeStyle = {
    color: 'primary.main',
  };
  const { t } = useTranslate('common');

  return (
    <Link
      component={RouterLink}
      to={path}
      underline="none"
      color="inherit"
      variant="subtitle2"
      sx={{
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        textTransform: 'capitalize',
        height: PARENT_ITEM_HEIGHT,
        lineHeight: `${PARENT_ITEM_HEIGHT}px`,
        transition: (theme) => theme.transitions.create('all'),
        '&:hover': activeStyle,
        ...(open && activeStyle),
      }}
      {...other}
    >
      {icon && <Stack sx={{ width: 20, height: 20, mr: 1 }}>{icon}</Stack>}

      {t('categories')}

      {hasSub && <Iconify icon="carbon:chevron-down" width={16} sx={{ ml: 1 }} />}
    </Link>
  );
}
