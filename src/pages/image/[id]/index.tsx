import { Box } from '@mui/system';
import axios from 'axios';
import { ReactNode } from 'react';
import BlankLayout from 'src/@core/layouts/BlankLayout';

const Image = ({ imageData }: any) => (

  <Box sx={{ display: 'flex' }}>
    {imageData? <img alt="" style={{ margin: 'auto' }} src={`data:image/jpeg;base64,${imageData}`} /> : <p>Image not found</p>}
  </Box >
);

export const getServerSideProps = async (context: any) => {
  // Fetch the image from the external URL
  try{

  console.log("slug", context.params.id)

  const response = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN_API}/api/ai/image/${context.params.id}.png`, {
    responseType: 'arraybuffer',
  });

  // Convert the image data to base64
  const imageData = Buffer.from(response.data, 'binary').toString('base64');

  return { props: { imageData } };
}catch{
  return { props: {imageData : null} }
}
};

export default Image;

Image.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

