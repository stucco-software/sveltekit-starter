<script type="text/javascript">
  import {
    PUBLIC_CLIENT_ID,
    PUBLIC_HOST,
    PUBLIC_PROVIDER
  } from '$env/static/public'
  import {
    login,
    getDefaultSession
  } from '@inrupt/solid-client-authn-browser'

  let { data } = $props()

  const startLogin = async () => {
    await login({
      clientId: PUBLIC_CLIENT_ID,
      redirectUrl: `${PUBLIC_HOST}auth/confirm`,
      oidcIssuer: PUBLIC_PROVIDER,
      clientName: "Stucco Data Collective"
    })
  }

</script>

<h1>
  Sign In
</h1>

<h2>With Stucco Software SolidID</h2>
<button onclick={startLogin}>Sign In With SolidID</button>
<p>
  No account? <a href="https://solidid.stucco.software/account/create">create one for free</a> or learn more about <a href="/docs/solidid">SolidID</a>.
</p>

<!-- TK! Just pass the other provider as a param to startLogin -->
<!-- <h2>With Other Provider</h2>
<p>
  This app works with any Solid Pod provider.
</p>
<form
  action="/auth?/webid"
  method="POST">
  <label>Pod Provider URL:</label>
  <input type="text" name="provider" placeholder="https://you.webid.com/">
  <button>Log In</button>
</form> -->

<style type="text/css">
  label, input {
    display: block;
    width: 100%;
    margin-block-end: 1rem;
  }
  h2 {
    margin-block-start: 5rem;
  }
</style>