import React, { useState } from 'react';
import { Stack, StackProps, Typography, Collapse, Box } from '@mui/material';
import Iconify from 'src/components/iconify';

interface BlockProps extends StackProps {
  title: string;
  children: React.ReactNode;
}

function Block({ title, children, ...other }: BlockProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <Stack spacing={3} {...other}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          cursor: 'pointer',
          p: 1.5,
          borderRadius: 1,
          bgcolor: 'background.neutral',
          transition: theme => theme.transitions.create('all'),
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          {title}
        </Typography>
        <Iconify
          icon={expanded ? "eva:arrow-ios-downward-fill" : "eva:arrow-ios-forward-fill"}
          width={20}
          sx={{
            color: 'text.secondary',
            transition: theme => theme.transitions.create('transform'),
            ...(expanded && {
              transform: 'rotate(0deg)',
            }),
          }}
        />
      </Stack>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box sx={{ pt: 1 }}>
          {children}
        </Box>
      </Collapse>
    </Stack>
  );
}

export default Block; 