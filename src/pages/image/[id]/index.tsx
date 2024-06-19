import { Box } from '@mui/system';
import axios from 'axios';
import { ReactNode } from 'react';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import Head from 'next/head';

const Image = ({ imageData, id }: any) => (
  <>
    <Head>
      <meta name="description" content={`BusAi {id}`}/>
      <meta property="og:title" content={`Dog, cat? No, now Panda ruled the world`} />
      <meta property="og:description" content={`The great #BUSAI has arrived`} />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_DOMAIN_API}/api/ai/image/${id}.png`} />
      <meta name="og:image:width" content="400" />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_DOMAIN_API}/api/ai/image/${id}.png`} />
      <meta name="og:image:width" content="800" />
      <meta property="og:image" content={`${process.env.NEXT_PUBLIC_DOMAIN_API}/api/ai/image/${id}.png`} />
      <meta name="og:image:width" content="1800" />
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title"  content={`Dog, cat? No, now Panda ruled the world`}/>
      <meta name="twitter:description" content={`The great #BUSAI has arrived`}/>
      <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_DOMAIN_API}/api/ai/image/${id}.png`} />
      <meta name="twitter:image:width" content="400" />
      <meta name="twitter:image:height" content="400" />
      <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_DOMAIN_API}/api/ai/image/${id}.png`} />
      <meta name="twitter:image:width" content="800" />
      <meta name="twitter:image:height" content="800" />
      <meta property="twitter:image" content={`${process.env.NEXT_PUBLIC_DOMAIN_API}/api/ai/image/${id}.png`} />
      <meta name="twitter:image:width" content="1800" />
      <meta name="twitter:image:height" content="1800" />
      <title>BusAi {id}</title>
    </Head>
    <Box sx={{ minHeight: '100vh',  display: 'flex', justifyContent: 'center', alignItems:'center' }}>
      {imageData ? <img alt="" style={{ margin: 'auto' , maxWidth: '100vw', maxHeight: '100vh'}} src={`data:image/jpeg;base64,${imageData}`} /> : <p>Image not found</p>}
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

