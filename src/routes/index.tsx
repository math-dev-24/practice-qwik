import { component$ } from "@builder.io/qwik";
import {type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div>
      <h1 class="text-2xl text-center mt-2 mb-6">Test Qwik Framework</h1>
      <ul>
        <li>
          CMD + R : recherche de tâches
        </li>
        <li>
          CNTRL + R : recherche de tâches
        </li>
      </ul>
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
