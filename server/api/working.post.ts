export default defineEventHandler(async (event) => {
  throw createError({
    statusCode: 418,
    statusMessage: "I'm a teapot",
  })
});