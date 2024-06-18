import { Box } from '@mui/system';
import axios from 'axios';
import { ReactNode } from 'react';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import Helmet from 'react-helmet'; // Or import { MetaTags } from 'react-meta-tags';

const Image = ({ imageData, id }: any) => (
  <>
    <Helmet>
      <meta property="og:title" content={id} />
      <meta property="og:description" content={id} />
      <meta property="og:image" content={`data:image/jpeg;base64,${imageData}`} />
      <meta property="og:url" content={`/image${id}`} />
      <meta property="og:type" content="website" />
    </Helmet>

    <Box sx={{ display: 'flex' }}>
      {imageData ? <img alt="" style={{ margin: 'auto' }} src={`data:image/jpeg;base64,${imageData}`} /> : <p>Image not found</p>}
    </Box >
  </>
);

export const getServerSideProps = async (context: any) => {
  // Fetch the image from the external URL
  try {

    console.log("slug", context.params.id)

    const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_API}/api/ai/image/${context.params.id}.png`, {
      responseType: 'arraybuffer',
    });

    // Convert the image data to base64
    const imageData = Buffer.from(response.data, 'binary').toString('base64');

    return { props: { imageData , id: context.params.id } };
  } catch {
    return { props: { imageData: null, id: null } }
  }
};

export default Image;

Image.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

