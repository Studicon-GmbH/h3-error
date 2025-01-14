<template>
  <div>
    <button @click="simulateError">Simulate Error</button>
  </div>
</template>

<script setup lang="ts">
import { createError } from '#app';
import { readFormData } from 'h3';

const simulateError = async () => {
  try {
    // Simulate a request event
    const event = {
      req: {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data; boundary=someBoundary',
        },
        body: '---someBoundary\r\nContent-Disposition: form-data; name="test"\r\n\r\nstring\r\n---someBoundary--',
      },
    };

    // Not working when called before error is thrown
    // await readFormData(event as any);
    throw createError({
      statusCode: 500,
      statusMessage: "Test Error",
    });
    // Working when called after error is thrown
    //await readFormData(event as any);
  } catch (error) {
    console.error("Fehler aufgetreten:", error);
  }
};
</script>