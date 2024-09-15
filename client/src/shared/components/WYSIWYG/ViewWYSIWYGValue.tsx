import DOMPurify from 'dompurify';
import parse from 'html-react-parser';

interface Props {
  value: string;
}

const ViewWYSIWYGValue = (props: Props) => {
  const { value } = props;

  const sanitizedValue = DOMPurify.sanitize(value);

  const parsedValue = parse(sanitizedValue);

  return parsedValue;
};

export default ViewWYSIWYGValue;
