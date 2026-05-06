import './styles/main.css';

const root = document.querySelector('#app');

if (root) {
  root.innerHTML = `
    <main id="main" role="main" class="font-sans px-4 py-16 sm:px-6">
      <section aria-labelledby="starter-heading" class="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <p class="text-xs font-semibold uppercase tracking-wide text-gray-500">Starter Boilerplate</p>
        <h1 id="starter-heading" class="mt-2 text-3xl font-normal tracking-tight text-gray-900">
          New Project Ready
        </h1>
        <p class="mt-4 text-gray-600">
          Replace this starter section with your first page components.
          See <code>src/components/COMPONENTS.md</code>, <code>src/components/WIREFRAMES.md</code>,
          and <code>src/assets/images/README.md</code> for implementation guides.
        </p>
      </section>
    </main>
  `;
}
