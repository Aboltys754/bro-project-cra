import { Helmet } from "react-helmet";

type Props = {
  title?: string,
  description?: string,
}

const defaultTitle = 'SIGNAL - поставщик автомобильных запчастей и запасных частей к спецтехнике';
const defaultDescription = 'SIGNAL - поставщик автомобильных запчастей и запасных частей к спецтехнике';

export default function Head({title, description}: Props) {
  return <Helmet>
    <title>{title || defaultTitle}</title>
    <meta name="description" content={description || defaultDescription} />
  </Helmet>
}