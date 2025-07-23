<template>
  <!-- <div>
    <div class="modal-overlay">
      <div class="modal-content1 bodyModal text-center">
        <div class="mb-4 row"><h1>Authorization</h1></div>
        <div class="row mx-5"><input placeholder="Login" /></div>
        <div class="row mx-5 my-4">
          <input placeholder="Password" type="password" />
        </div>
        <div class="row mb-4">
          <a class="col col-7">Registration</a>
          <button class="col col-3 actBtn">Login</button>
        </div>
      </div>
    </div>
  </div> -->

  <!-- <div>
    <div class="modal-overlay">
      <div class="modal-content1 bodyModal">
        <div class="mb-4 row text-center"><h1>Registration</h1></div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Name</label>
          <input class="col col-8" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Password</label>
          <input type="password" class="col col-8" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">E-mail</label>
          <input class="col col-8" />
        </div>
        <div class="mb-4 row">
          <label class="col col-4 lab">Phone</label>
          <input class="col col-8" />
        </div>
        <div class="row">
          <div class="col col-5"></div>
          <button class="col col-3 mx-3 actBtn">Cancel</button>
          <button class="col col-3 actBtn">OK</button>
        </div>
      </div>
    </div>
  </div> -->

  <div>
    <div class="modal-overlay">
      <div class="modal-content1">
        <div class="fotterModal p-3">
          <div class="row">
            <h1 class="lab col col-4">Nikname</h1>
            <h6 class="col col-8 mt-3">id 1345253</h6>
          </div>
        </div>
        <div class="bodyModal">
          <div class="mb-4 row">
            <label class="col col-4 lab">Name</label>
            <input class="col col-8" />
          </div>
          <div class="mb-4 row">
            <label class="col col-4 lab">Password</label>
            <input type="password" class="col col-8" />
          </div>
          <div class="mb-4 row">
            <label class="col col-4 lab">E-mail</label>
            <input class="col col-8" />
          </div>
          <div class="mb-4 row">
            <label class="col col-4 lab">Phone</label>
            <input class="col col-8" />
          </div>
          <div class="row">
            <div class="col col-3"></div>
            <button class="col col-3 mx-3 actBtn">Cancel</button>
            <button class="col col-5 actBtn">Delete profile</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lo: false,
    };
  },
};
</script>
<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content1 {
  border-radius: 10px;
  min-width: 500px;
}

a {
  color: white;
}

.fotterModal {
  background-color: #141232;
}

.bodyModal {
  background: #14213d;
  padding: 2rem;
}
h6 {
  color: white;
}

input {
  border-radius: 8px;
  padding: 5px 10px 5px 10px;
  background-color: #e5e5e599;
}
.lab {
  color: white;
  font-size: 28px;
}
</style>
