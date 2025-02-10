import type { BoxProps } from '@mui/material/Box';
import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import type { Theme, SxProps, CSSObject } from '@mui/material/styles';

import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import ButtonBase, { buttonBaseClasses } from '@mui/material/ButtonBase';

import { varAlpha, stylesMode } from 'src/theme/styles';

import { carouselClasses } from '../classes';

import type { CarouselArrowButtonProps, CarouselArrowButtonsProps } from '../types';

// ----------------------------------------------------------------------

export function CarouselArrowBasicButtons({
  options,
  slotProps,
  onClickPrev,
  onClickNext,
  disablePrev,
  disableNext,
  sx,
  className,
  ...other
}: BoxProps & CarouselArrowButtonsProps) {
  return (
    <Box
      className={carouselClasses.arrows.concat(className ? ` ${className}` : '')}
      sx={{
        display: 'flex',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        left: 0,
        right: 0,
        zIndex: 9,
        justifyContent: 'space-between',
        ...sx,
      }}
      {...other}
    >
      <ArrowButton
        className="arrow-btn"
        variant="prev"
        options={options}
        disabled={disablePrev}
        onClick={onClickPrev}
        svgIcon={slotProps?.prevBtn?.svgIcon}
        svgSize={slotProps?.prevBtn?.svgSize}
        sx={{
          left: 8,
          ...slotProps?.prevBtn?.sx,
        }}
      />

      <ArrowButton
        className="arrow-btn"
        variant="next"
        options={options}
        disabled={disableNext}
        onClick={onClickNext}
        svgIcon={slotProps?.nextBtn?.svgIcon}
        svgSize={slotProps?.nextBtn?.svgSize}
        sx={{
          right: 8,
          ...slotProps?.nextBtn?.sx,
        }}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function CarouselArrowNumberButtons({
  options,
  slotProps,
  totalSlides,
  selectedIndex,
  onClickPrev,
  onClickNext,
  disablePrev,
  disableNext,
  sx,
  className,
  ...other
}: BoxProps & CarouselArrowButtonsProps) {
  return (
    <Box
      alignItems="center"
      display="inline-flex"
      className={carouselClasses.arrows.concat(className ? ` ${className}` : '')}
      sx={{
        p: 0.5,
        gap: 0.25,
        zIndex: 9,
        borderRadius: 1.25,
        color: 'common.white',
        bgcolor: (theme) => varAlpha(theme.palette.grey[900], 0.48),
        ...sx,
      }}
      {...other}
    >
      <ArrowButton
        variant="prev"
        options={options}
        disabled={disablePrev}
        onClick={onClickPrev}
        sx={{ p: 0.75, borderRadius: 'inherit', ...slotProps?.prevBtn?.sx }}
        svgIcon={slotProps?.prevBtn?.svgIcon}
        svgSize={slotProps?.prevBtn?.svgSize ?? 16}
      />

      <Box
        component="span"
        className={carouselClasses.arrowsLabel}
        sx={{ mx: 0.5, typography: 'subtitle2' }}
      >
        {selectedIndex}/{totalSlides}
      </Box>

      <ArrowButton
        variant="next"
        options={options}
        disabled={disableNext}
        onClick={onClickNext}
        sx={{ p: 0.75, borderRadius: 'inherit', ...slotProps?.nextBtn?.sx }}
        svgIcon={slotProps?.nextBtn?.svgIcon}
        svgSize={slotProps?.prevBtn?.svgSize ?? 16}
      />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function CarouselArrowFloatButtons({
  sx,
  options,
  slotProps,
  onClickPrev,
  onClickNext,
  disablePrev,
  disableNext,
}: CarouselArrowButtonsProps & { sx?: SxProps<Theme> }) {
  const baseStyles = {
    zIndex: 9,
    top: '50%',
    borderRadius: 1.5,
    position: 'absolute',
    color: 'common.white',
    bgcolor: 'text.primary',
    transform: 'translateY(-50%)',
    '&:hover': { opacity: 0.8 },
    [stylesMode.dark]: { color: 'grey.800' },
    ...sx,
  } as CSSObject;

  return (
    <>
      <ArrowButton
        variant="prev"
        options={options}
        disabled={disablePrev}
        onClick={onClickPrev}
        svgIcon={slotProps?.prevBtn?.svgIcon}
        svgSize={slotProps?.prevBtn?.svgSize}
        sx={{ left: -16, ...baseStyles, ...slotProps?.prevBtn?.sx }}
      />

      <ArrowButton
        variant="next"
        options={options}
        disabled={disableNext}
        onClick={onClickNext}
        svgIcon={slotProps?.nextBtn?.svgIcon}
        svgSize={slotProps?.nextBtn?.svgSize}
        sx={{ right: -16, ...baseStyles, ...slotProps?.nextBtn?.sx }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

export function ArrowButton({
  sx,
  disabled,
  onClick,
  svgIcon,
  svgSize,
  variant,
  options,
  className,
  ...other
}: ButtonBaseProps & CarouselArrowButtonProps) {
  const arrowPrev = variant === 'prev';

  const prevSvg = svgIcon || (
    <path
      fill="currentColor"
      d="M15.488 4.43a.75.75 0 0 0-1.057.082l-6 7a.75.75 0 0 0 0 .976l6 7a.75.75 0 0 0 1.138-.976L9.988 12l5.581-6.512a.75.75 0 0 0-.081-1.057"
    />
  );

  const nextSvg = svgIcon || (
    <path
      fill="currentColor"
      d="M8.512 4.43a.75.75 0 0 1 1.057.082l6 7a.75.75 0 0 1 0 .976l-6 7a.75.75 0 0 1-1.138-.976L14.012 12 8.431 5.488a.75.75 0 0 1 .08-1.057"
    />
  );

  return (
    <ButtonBase
      disabled={disabled}
      onClick={onClick}
      className={
        arrowPrev
          ? carouselClasses.arrowPrev.concat(className ? ` ${className}` : '')
          : carouselClasses.arrowNext.concat(className ? ` ${className}` : '')
      }
      sx={{
        width: 40,
        height: 40,
        borderRadius: '50%',
        position: 'absolute',
        zIndex: 9,
        opacity: 0.48,
        transition: (theme) =>
          theme.transitions.create(['opacity', 'background-color'], {
            duration: theme.transitions.duration.shorter,
          }),
        '&:hover': {
          opacity: 1,
        },
        [`&.${buttonBaseClasses.disabled}`]: {
          opacity: 0.32,
        },
        ...sx,
      }}
      {...other}
    >
      <SvgIcon
        className={carouselClasses.arrowSvg}
        sx={{
          width: svgSize ?? 24,
          height: svgSize ?? 24,
          transform: options?.axis === 'y' ? 'rotate(90deg)' : 'none',
        }}
      >
        {arrowPrev ? prevSvg : nextSvg}
      </SvgIcon>
    </ButtonBase>
  );
}
