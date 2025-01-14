export async function getData() {
  const formData = await readFormData(useEvent());
  let dataString = "{}";
  const files: Record<string, File> = {};
  for (const [key, value] of formData.entries()) {
    if (key === "data" && typeof value === "string") {
      dataString = value;
    } else if (value instanceof File) {
      files[key] = value;
    }
  }
  return { dataString, files };
}