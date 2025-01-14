import { getData } from "../utils/helpers";

export default defineEventHandler(async (event) => {
  const { dataString, files } = await getData();
  console.log(dataString, files);
  throw createError({
    statusCode: 418,
    statusMessage: "I'm a teapot",
  })
});