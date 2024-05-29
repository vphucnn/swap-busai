import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { IconButton, Tooltip } from '@mui/material'; // For styling and tooltip (optional)
import { Box } from '@mui/system';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface Props {
  text: string,
}
export const CopyIcon = ({ text }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1000); // Optional: Reset copied state after a delay
  };

  return (
    <Box>
      <CopyToClipboard text={text} onCopy={handleCopy}>
        <Tooltip title={copied ? 'Copied!' : 'Click to copy'}>
          <IconButton  aria-label={copied ? 'Copied' : 'Copy'}>
            <ContentCopyIcon sx={{width: 15, height: 15}} color={copied ? 'success' : 'inherit'} />
          </IconButton>
        </Tooltip>
      </CopyToClipboard>
    </Box>
  );
}
