"use server";

import axios from "axios";

export default async function uploadImage(image: File): Promise<string> {
  const url = `${process.env.IMGBB_UPLOAD_URL}?key=${process.env.IMGBB_API_KEY}`;
  const formData = new FormData();
  formData.append("image", image);
  const res = await axios.post(url, formData).then((res) => res.data);
  return res.data.url as string;
}
