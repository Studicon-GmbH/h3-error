// plugins/error-handler.ts
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('vue:error', (error, instance, info) => {
      console.error('Fehler aufgetreten:', error, instance, info);
    });
  });