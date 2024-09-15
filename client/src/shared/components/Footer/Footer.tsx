import { Divider, Typography } from '@mui/material';
import { TODO } from 'shared/types';
import { FooterContainer } from './styles';

interface Props {
  children?: TODO;
}

const Footer = (props: Props) => {
  const { children = '' } = props;
  return (
    <FooterContainer maxWidth="md">
      <Divider />
      <Typography>{children}</Typography>
    </FooterContainer>
  );
};

export default Footer;
