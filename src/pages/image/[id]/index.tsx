import { Box } from '@mui/system';
import axios from 'axios';
import { ReactNode } from 'react';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import Head from 'next/head';

const Image = ({ imageData, id }: any) => (
  <>
    <Head>
      <meta name="twitter:card" content={`${id}`} />
      <meta name="twitter:title"  content={`${id}`}/>
      <meta property="og:title" content={`${id}`} />
      <meta property="og:description" content={`BusAi ${id}`} />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_DOMAIN_API}/api/ai/image/${id}.png`} />
      <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_DOMAIN_API}/api/ai/image/${id}.png`} />
      <title>BusAi {id}</title>
    </Head>
    <Box sx={{ minHeight: '100vh',  display: 'flex', justifyContent: 'center', alignItems:'center' }}>
      {imageData ? <img alt="" style={{ margin: 'auto' , maxWidth: '99vw'}} src={`data:image/jpeg;base64,${imageData}`} /> : <p>Image not found</p>}
    </Box >
  </>
);

export const getServerSideProps = async (context: any) => {
  // Fetch the image from the external URL
  try {
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

