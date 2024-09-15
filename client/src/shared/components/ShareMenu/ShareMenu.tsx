import { useState } from 'react';
import { SpeedDial, SpeedDialAction } from '@mui/material';

import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkIcon from '@mui/icons-material/Link';

const shareWindowParam =
  'left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0';

const ShareMenu = () => {
  const [open, setOpen] = useState(false);

  const handleCopyLinkClick = () => {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
  };

  const handleTwitterClick = () => {
    const link = window.location.href;
    const text = 'Check this out!';
    window.open(
      `http://twitter.com/share?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`,
      '',
      shareWindowParam
    );
  };

  const handleFacebookClick = () => {
    const link = window.location.href;
    const redirect = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
    window.open(redirect, '', shareWindowParam);
  };

  return (
    <SpeedDial
      ariaLabel="Share Menu"
      sx={{ position: 'fixed', bottom: 16, right: 16 }}
      icon={<ShareIcon />}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <SpeedDialAction
        key={'link'}
        icon={<LinkIcon />}
        tooltipTitle={'Copy Link'}
        onClick={() => handleCopyLinkClick}
      />
      <SpeedDialAction
        key={'twitter'}
        icon={<TwitterIcon />}
        tooltipTitle={'Share on Twitter'}
        onClick={handleTwitterClick}
      />
      <SpeedDialAction
        key={'facebook'}
        icon={<FacebookIcon />}
        tooltipTitle={'Share on Facebook'}
        onClick={handleFacebookClick}
      />
    </SpeedDial>
  );
};

export default ShareMenu;
