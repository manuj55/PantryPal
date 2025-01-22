<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-lg-8">
        <div class="row mt-4">
          <div class="col-xl-6 mb-xl-0 mb-4">
            <master-card />
          </div>
          <div class="col-md-10 mb-4">
            <payment-methods-card />
          </div>
        </div>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-md-7">
        <billing-card
          title="Billing Information"
          :bills="[
            {
              name: 'Oliver Liam',
              company: 'Viking Burrito',
              email: 'oliver@burrito.com',
              id: 'FRB1235476',
            },
            {
              name: 'Lucas Harper',
              company: 'Stone Tech Zone',
              email: 'lucas@stone-tech.com',
              id: 'FRB1235476',
            },
            {
              name: 'Ethan James',
              company: 'Fiber Notion',
              email: 'ethan@fiber.com',
              id: 'FRB1235476',
            },
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script>
import setTooltip from "@/assets/js/tooltip.js";
import MasterCard from "@/examples/Cards/MasterCard.vue";
import PaymentMethodsCard from "./components/PaymentMethodsCard.vue";
import BillingCard from "./components/BillingCard.vue";

export default {
  name: "Billing",
  components: {
    MasterCard,
    PaymentMethodsCard,
    BillingCard,
  },
  mounted() {
    setTooltip();
  },
};
</script>
