<template>
  <nav aria-label="breadcrumb">
    <ol class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb me-sm-6">
      <li class="text-sm breadcrumb-item">
        <a :class="['opacity-8', textWhite]" href="#">Pages</a>
      </li>
      <li
        class="text-sm breadcrumb-item active"
        :class="textWhite ? 'text-white' : 'text-dark'"
        aria-current="page"
      >
        {{ currentPage }}
      </li>
    </ol>
    <h6 class="mb-0 font-weight-bolder" :class="textWhite ? 'text-white' : ''">
      {{ currentPage }}
    </h6>
  </nav>
</template>

<script>
export default {
  name: "breadcrumbs",
  props: {
    currentPage: {
      required: true,
    },
    textWhite: {
      type: String,
    },
  },
};
</script>
