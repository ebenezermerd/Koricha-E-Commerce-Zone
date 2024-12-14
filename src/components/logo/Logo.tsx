import { memo } from "react";

import { Link as RouterLink } from "react-router-dom";
// @mui
import { useTheme } from "@mui/material/styles";
import { Box, BoxProps, Link } from "@mui/material";
import { CONFIG } from "src/config-global";

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  single?: boolean;
}

function Logo({ single = false, sx }: LogoProps) {
  const theme = useTheme();

  const PRIMARY_MAIN = theme.palette.primary.main;

  const singleLogo = (
    <Box
      alt="Single logo"
      component="img"
      src={`${CONFIG.assetsDir}/assets/logo/logo-single.png`}
      width="100%"
      height="100%"
    />
  );

  const fullLogo = (
    <Box
      alt="Full logo"
      component="img"
      src={`${CONFIG.assetsDir}/assets/logo/logo-full.png`}
      width="100%"
      height="100%"
    />
  );

  return (
    <Link
      component={RouterLink}
      to="/"
      color="inherit"
      aria-label="go to homepage"
      sx={{ lineHeight: 0 }}
    >
      <Box
        sx={{
          width: single ? 200 : 145,
          lineHeight: 0,
          cursor: "pointer",
          display: "inline-flex",
          ...sx,
        }}
      >
        {single ? singleLogo : fullLogo}
      </Box>
    </Link>
  );
}

export default memo(Logo);
