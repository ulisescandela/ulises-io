'use server'

export async function getPrivateCVData(code) {
  const correctCode = process.env.DOWNLOAD_CV_CODE;
  
  if (!correctCode) {
    console.error("DOWNLOAD_CV_CODE environment variable is not set.");
    return { success: false, message: "Server configuration error" };
  }

  if (code === correctCode) {
    return {
      success: true,
      data: {
        email: process.env.CV_EMAIL,
        phone: process.env.CV_PHONE,
        address: process.env.CV_ADDRESS
      }
    };
  }

  return { success: false, message: "Incorrect code" };
}
