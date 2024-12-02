<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Left Column - Login Form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-6">
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Welcome back</h2>
          <p class="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>

        <FormKit
          type="form"
          id="loginForm"
          :actions="false"
          :submit-attrs="{
            inputClass: loading
              ? 'opacity-50 cursor-not-allowed'
              : '',
          }"
          :disabled="loading"
          @submit="handleSubmit"
          :value="formData"
        >
          <template #default>
            <FormKitSchema :schema="loginSchema" :data="{}">
              <template #prefix="{ loading }">
                <q-spinner v-if="loading" color="white" size="1.5em" />
              </template>
            </FormKitSchema>
          </template>
        </FormKit>

        <p class="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <a href="#" class="text-primary hover:text-primary-dark font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>

    <!-- Right Column - Background Image -->
    <div
      class="hidden md:block md:w-1/2 bg-cover bg-center"
      :style="{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://source.unsplash.com/random?workspace)',
      }"
    >
      <div class="h-full flex items-center justify-center p-12">
        <div class="text-center text-white">
          <h1 class="text-4xl font-bold mb-4">Servinder</h1>
          <p class="text-xl">
            Your one-stop solution for service management
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-facing-decorator';
import { useAuth } from '@/composables/useAuth';
import { loginSchema, LoginForm } from '@/schemas/auth';
import { QSpinner } from 'quasar';
import { FormKit, FormKitSchema } from '@formkit/vue';

@Component({
  name: 'Welcome',
  components: {
    QSpinner,
    FormKit,
    FormKitSchema,
  },
})
export default class Welcome extends Vue {
  private auth = useAuth();
  public formData: LoginForm = {
    email: '',
    password: '',
    remember: false,
  };
  public loading = false;
  public loginSchema = loginSchema;

  async handleSubmit(form: LoginForm) {
    this.loading = true;
    try {
      await this.auth.login(form);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style>
.bg-primary {
  background-color: var(--q-primary);
}
.bg-primary-dark {
  background-color: var(--q-primary-dark);
}
.text-primary {
  color: var(--q-primary);
}
.text-primary-dark {
  color: var(--q-primary-dark);
}
</style>
