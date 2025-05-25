import { component$ } from "@builder.io/qwik";
import {type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div>
      <h1>Test Qwik Framework</h1>
    </div>
  );
});

export const head: DocumentHead = {
  title: "DEMO Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
