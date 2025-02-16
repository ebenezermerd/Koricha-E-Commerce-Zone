import { useState, useEffect } from 'react';
// @mui
import { Container, Stack, Typography, IconButton } from '@mui/material';
// components
import Iconify from 'src/components/iconify';
//
import { SupportHero, SupportNav, SupportContent } from '../components';
import { FAQ_CATEGORIES } from 'src/_mock/arrays/_faqsSupport';

// ----------------------------------------------------------------------

export default function SupportView() {
  const [topic, setTopic] = useState(FAQ_CATEGORIES[0].title);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleChangeTopic = (event: React.SyntheticEvent, newValue: string) => {
    setTopic(newValue);
  };

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [topic]);

  const currentFaqs = FAQ_CATEGORIES.find((category) => category.title === topic)?.faqs || [];
  const hasPagination = currentFaqs.length > 8;

  return (
    <>
      <SupportHero />

      <Stack
        alignItems="flex-end"
        sx={{
          py: 1.5,
          px: 2.5,
          display: { md: 'none' },
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <IconButton onClick={() => setMobileOpen(true)}>
          <Iconify icon="carbon:menu" />
        </IconButton>
      </Stack>

      <Container>
        <Typography variant="h3" sx={{ py: { xs: 3, md: 10 } }}>
          Frequently Asked Questions
        </Typography>

        <Stack 
          direction="row" 
          sx={{ 
            pb: hasPagination ? 0 : { xs: 10, md: 15 }
          }}
        >
          <SupportNav
            sidebarConfig={FAQ_CATEGORIES}
            topic={topic}
            isOpenSidebar={mobileOpen}
            onChangeTopic={handleChangeTopic}
            onCloseSidebar={() => setMobileOpen(false)}
          />

          <SupportContent contents={currentFaqs} />
        </Stack>
      </Container>
    </>
  );
}
