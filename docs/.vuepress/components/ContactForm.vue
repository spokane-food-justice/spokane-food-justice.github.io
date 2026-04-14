<template>
  <div class="contact-form-wrapper">
    <form
      v-if="!submitted"
      :action="formspreeUrl"
      method="POST"
      class="contact-form"
      @submit.prevent="handleSubmit"
    >
      <div class="form-group">
        <label for="name">Name <span class="required">*</span></label>
        <input id="name" type="text" name="name" required />
      </div>

      <div class="form-group">
        <label for="pronouns">Pronouns</label>
        <input id="pronouns" type="text" name="pronouns" placeholder="e.g. she/her, he/him, they/them" />
      </div>

      <div class="form-group">
        <label for="email">Email <span class="required">*</span></label>
        <input id="email" type="email" name="email" required />
      </div>

      <div class="form-group">
        <label for="phone">Phone</label>
        <input id="phone" type="tel" name="phone" />
      </div>

      <fieldset class="form-group">
        <legend>How would you like us to respond? <span class="required">*</span></legend>
        <div class="radio-group">
          <label>
            <input type="radio" name="response_method" value="Email" required />
            Email
          </label>
          <label>
            <input type="radio" name="response_method" value="Phone" />
            Phone
          </label>
          <label>
            <input type="radio" name="response_method" value="No preference" />
            No preference
          </label>
        </div>
      </fieldset>

      <div class="form-group">
        <label for="message">Concerns, ideas, or suggestions <span class="required">*</span></label>
        <textarea id="message" name="message" rows="6" required></textarea>
      </div>

      <button type="submit" class="submit-btn" :disabled="submitting">
        {{ submitting ? 'Sending...' : 'Send Message' }}
      </button>

      <p v-if="error" class="form-error">
        Something went wrong. Please try again or email us directly at
        <a href="mailto:info@spokanefoodjustice.org">info@spokanefoodjustice.org</a>.
      </p>
    </form>

    <div v-else class="form-success">
      <h3>Thank you!</h3>
      <p>Your message has been sent. We'll get back to you soon.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Replace PLACEHOLDER with your Formspree form ID (e.g. "xyzabc")
const formspreeUrl = 'https://formspree.io/f/PLACEHOLDER'

const submitting = ref(false)
const submitted = ref(false)
const error = ref(false)

async function handleSubmit(e) {
  submitting.value = true
  error.value = false

  const data = new FormData(e.target)

  try {
    const res = await fetch(formspreeUrl, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
    if (res.ok) {
      submitted.value = true
    } else {
      error.value = true
    }
  } catch {
    error.value = true
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.contact-form-wrapper {
  max-width: 600px;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label,
.form-group legend {
  display: block;
  font-weight: 600;
  margin-bottom: 0.35rem;
}

fieldset.form-group {
  border: none;
  padding: 0;
  margin-left: 0;
}

.required {
  color: var(--c-danger, #e74c3c);
}

input[type="text"],
input[type="email"],
input[type="tel"],
textarea {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--c-border, #ddd);
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: var(--c-brand, #3eaf7c);
  box-shadow: 0 0 0 2px rgba(62, 175, 124, 0.25);
}

.radio-group {
  display: flex;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-top: 0.25rem;
}

.radio-group label {
  font-weight: 400;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  cursor: pointer;
}

.submit-btn {
  background-color: var(--c-brand, #3eaf7c);
  color: #fff;
  border: none;
  padding: 0.65rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

.submit-btn:hover {
  background-color: var(--c-brand-light, #4abf8a);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.form-error {
  color: var(--c-danger, #e74c3c);
  margin-top: 0.75rem;
}

.form-success {
  padding: 1.5rem;
  background-color: #f0faf4;
  border: 1px solid var(--c-brand, #3eaf7c);
  border-radius: 6px;
}

.form-success h3 {
  margin-top: 0;
  color: var(--c-brand, #3eaf7c);
}
</style>
