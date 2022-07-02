<template>
  <div class="view">
    <div class="container text-center">
      <div class="title">
        <h1>Create a new account</h1>
      </div>
      <div class="subtitle">
        <p>
          Creating an account allows you to build and save custom calendars that
          can be queried using the provided API.
        </p>
      </div>
      <form class="new-user-form text-start">
        <div class="form-group mb-2">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div class="form-group mb-4">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: "SignUp-Page",
};
</script>
<Style scoped lang="scss">
.view {
  height: 100%;
  background-color: var(--background-color-primary);
  color: var(--text-primary-color);

  .container {
    padding-top: 20px;

    .subtitle {
      color: gray;
      font-size: 0.8rem;
    }

    .new-user-form {
      .btn {
        width: 100%;
      }
    }
  }
}
</Style>
