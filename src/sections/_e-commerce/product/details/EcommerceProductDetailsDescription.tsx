// @mui
import { Stack, Divider, Typography, Box } from '@mui/material';
// components
import Markdown from 'src/components/markdown';

// ----------------------------------------------------------------------

type Props = {
  description: string;
  specifications: {
    label: string;
    value: string;
  }[];
};

export default function EcommerceProductDetailsDescription({
  description,
  specifications,
}: Props) {
  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <Typography variant="h6">Description</Typography>
        <Markdown content={description} />
      </Stack>

      {specifications?.length > 0 && (
        <>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack spacing={2}>
            <Typography variant="h6">Specifications</Typography>

            <Stack spacing={2}>
              <Box sx={{ 
                display: 'table', 
                width: '100%',
                borderSpacing: '0 8px'
              }}>
                {specifications.map((item) => (
                  <Box 
                    key={item.label} 
                    sx={{ 
                      display: 'table-row'
                    }}
                  >
                    <Typography 
                      component="div"
                      variant="subtitle2" 
                      sx={{ 
                        display: 'table-cell', 
                        width: '30%', 
                        pb: 2 
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Typography 
                      component="div"
                      variant="body2" 
                      sx={{ 
                        display: 'table-cell',
                        color: 'text.secondary',
                        pb: 2
                      }}
                    >
                      {item.value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
}
