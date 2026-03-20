export const downloadUrl = (url: string) => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const segments = pathname.split("/").filter((s) => s.length > 0);
    const filename = segments.at(-1);

    if (!filename) {
      throw new Error("URL does not contain a valid filename");
    }

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank"; // fallback se o download for bloqueado
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error downloading the file", error);
  }
};
