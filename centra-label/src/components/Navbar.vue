<template>
<!---Just a future componet to interface with logins so that users can access their data and such -->
  <nav>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">POO</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a @click = "$router.push('/Login')">Login</a></li>
        
      </ul>
    </div>
  </nav>
</template>

<script>
export default {

}
</script>

<style>

</style>