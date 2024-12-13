import React, { useRef } from 'react';
// @mui
import { styled, alpha, useTheme } from '@mui/material/styles';
import { Box, Container, Typography, Stack, Unstable_Grid2 as Grid } from '@mui/material';
// utils
import { bgGradient } from 'src/utils/cssStyles';
// hooks
import useResponsive from 'src/hooks/useResponsive';
import useBoundingClientRect from 'src/hooks/useBoundingClientRect';
// types
import { ITeamMemberProps } from 'src/types/team';
// components
import { useCarousel, Carousel, CarouselArrowBasicButtons, CarouselDotButtons } from 'src/components/carousel';
// local components
import TeamMember from './TeamMember';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  padding: theme.spacing(10, 0),
  ...bgGradient({
    color: alpha(theme.palette.grey[900], 0.8),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    position: 'relative',
    padding: theme.spacing(20, 0),
  },
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    left: 0,
    right: 0,
    marginBottom: 0,
    position: 'absolute',
    height: 'calc(100% - 320px)',
  },
}));

// ----------------------------------------------------------------------

type Props = {
  members: ITeamMemberProps[];
};

export default function TeamMarketing({ members }: Props) {
  const theme = useTheme();

  const isMdUp = useResponsive('up', 'md');
  const isSmUp = useResponsive('up', 'sm');
  const isLgUp = useResponsive('up', 'lg');
  const isXlUp = useResponsive('up', 'xl');

  const containerRef = useRef<HTMLDivElement>(null);

  const container = useBoundingClientRect(containerRef);

  const offsetLeft = container?.left;

  // Determine slidesToShow based on screen size
  const slidesToShow = isXlUp ? 4 : isLgUp ? 3 : isMdUp ? 2 : 1;

  // Initialize the carousel
  const carousel = useCarousel({
    loop: true,
    axis: 'x',
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    dragFree: true,
  });

  const handlePrev = () => {
    carousel.arrows.onClickPrev();
  };

  const handleNext = () => {
    carousel.arrows.onClickNext();
  };

  return (
    <StyledRoot>
      <StyledContainer>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid xs={12} md={4}>
            <Stack spacing={3} sx={{ textAlign: { xs: 'center', md: 'unset' } }}>
              <Typography variant="overline" sx={{ color: 'grey.600' }}>
                Team
              </Typography>

              <Typography variant="h2" sx={{ color: 'primary.main' }}>
                Meet Our Team
              </Typography>

              <Typography sx={{ color: 'common.white' }}>
                Since wire-frame renderings are relatively simple and fast to calculate, they are
                often used in cases
              </Typography>
            </Stack>
          </Grid>

          <Grid xs={12} md={7}>
            <Box ref={containerRef} />
          </Grid>
        </Grid>

        {isMdUp && (
          <CarouselArrowBasicButtons
            options={carousel.options}
            disablePrev={carousel.arrows.disablePrev}
            disableNext={carousel.arrows.disableNext}
            onClickPrev={handlePrev}
            onClickNext={handleNext}
            sx={{
              position: 'absolute',
              bottom: 0,
              '& .mnl__carousel__btn--prev': { left: -8 },
              '& .mnl__carousel__btn--next': { right: -8 },
            }}
          />
        )}
      </StyledContainer>

      <Box
        sx={{
          pl: `${offsetLeft}px`,
          width: { md: `calc(100% + 120px)` },
        }}
      >
        <Carousel carousel={carousel}>
          {members.map((member) => (
            <Box
              key={member.id}
              sx={{
                ml: '-1px',
                pl: { xs: 2, md: 4 },
                pr: { xs: 2, md: 0 },
                color: 'common.white',
              }}
            >
              <TeamMember member={member} />
            </Box>
          ))}
        </Carousel>

        <CarouselDotButtons
          selectedIndex={carousel.dots.selectedIndex}
          scrollSnaps={carousel.dots.scrollSnaps}
          onClickDot={carousel.dots.onClickDot}
          sx={{
            mt: 8,
            display: { md: 'none' },
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </Box>
    </StyledRoot>
  );
}