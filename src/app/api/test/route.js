import { uploadImage } from '@/lib/cloudinary';

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('file');
  const url = await uploadImage(file);
  return new Response(JSON.stringify({ url }));
}
