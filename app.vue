<template>
  <div style="display: flex; gap: 20px; margin-bottom: 20px;">
    <button @click="callWorkingEndpoint">Working (errors immediately)</button>
    <span>Error: {{ errorWorking }}</span>
  </div>
  <div style="display: flex; gap: 20px; margin-bottom: 20px;">
    <input type="file" @change="file = ($event.target as HTMLInputElement).files![0]">
    <button @click="callNotWorkingEndpoint">Not working (hangs indefinetly)</button>
    <span>Error: {{ errorNotWorking }}</span>
  </div>
</template>

<script setup lang="ts">
import { H3Error } from 'h3';

const errorWorking = ref<H3Error>();
const errorNotWorking = ref<H3Error>();
const file = ref<File>();

const createFormData = () => {
  const formData = new FormData();
  formData.append("file", new Blob(["test"], { type: "text/plain" }), "test.txt");
  if (file.value) formData.append("file2", file.value);
  formData.append("data", JSON.stringify({ test: "test" }));
  return formData;
};

const callNotWorkingEndpoint = async () => {
  console.log("Calling not working endpoint");
  try {
    await $fetch("/api/not-working", {
      method: "POST",
      body: createFormData(),
    })
  } catch (error) {
    console.log("Error", error);
    if (error instanceof H3Error) {
      errorNotWorking.value = error
    }
  }
};

const callWorkingEndpoint = async () => {
  console.log("Calling working endpoint");
  try {
    await $fetch("/api/working", {
      method: "POST",
      body: createFormData(),
    })
  } catch (error) {
    console.log("Error", error);
    if (error instanceof H3Error) {
      errorWorking.value = error
    }
  }
};
</script>