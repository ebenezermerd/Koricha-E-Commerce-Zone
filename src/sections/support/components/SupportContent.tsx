import { useState } from 'react';
// @mui
import { 
  Box, 
  Accordion, 
  Typography, 
  AccordionSummary, 
  AccordionDetails,
  Stack,
  Pagination 
} from '@mui/material';
// components
import Iconify from 'src/components/iconify';
// types
import { FaqItem } from 'src/_mock/arrays/_faqsSupport';

// ----------------------------------------------------------------------

type SupportContentProps = {
  contents: FaqItem[];
};

const ITEMS_PER_PAGE = 8;

export default function SupportContent({ contents }: SupportContentProps) {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [page, setPage] = useState(1);

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
    setExpanded(false); // Close any expanded accordion when changing page
  };

  const handleChangeExpanded =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  // Calculate pagination
  const totalPages = Math.ceil(contents.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentPageItems = contents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <Box sx={{ pl: { md: 10 }, width: '100%' }}>
      {/* FAQ Accordions */}
      <Box sx={{ mb: 3 }}>
        {currentPageItems.map((faq) => (
          <Accordion
            key={faq.id}
            expanded={expanded === faq.question}
            onChange={handleChangeExpanded(faq.question)}
          >
            <AccordionSummary
              expandIcon={<Iconify icon="carbon:chevron-down" />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  my: 4,
                  ...(expanded === faq.question && {
                    mb: 2.5,
                  }),
                },
              }}
            >
              <Typography variant="subtitle1">{faq.question}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* Pagination */}
      {totalPages > 1 && (
        <Stack 
          direction="row" 
          justifyContent="center"
          sx={{ 
            pt: 3,
            pb: { xs: 10, md: 15 },
            borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChangePage}
            color="primary"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                fontSize: 16,
                padding: '8px 12px',
              },
            }}
          />
        </Stack>
      )}
    </Box>
  );
}
