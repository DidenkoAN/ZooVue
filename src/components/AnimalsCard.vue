<template>
  <div class="container">
    <div class="row pb-5">
      <div class="col col-3"><h3>Animals Card</h3></div>
      <div class="col col-1"><button class="actBtn">Add</button></div>
      <div class="col col-6">
        <button class="actBtn">Removed</button>
      </div>
    </div>
    <div class="row pt-5 pb-3 text-center">
      <div class="col col-4">
        <label class="col col-4">Filter</label>
        <input type="text" class="col col-4" />
      </div>
      <div class="col col-4">
        <label class="col col-4">Filter</label>
        <input type="text" class="col col-4" />
      </div>
      <div class="col col-4">
        <label class="col col-4">Filter</label>
        <input type="text" class="col col-4" />
      </div>
    </div>

    <div>
      <table class="my-3 container text-center">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col">aviary number</th>
            <th scope="col">animal</th>
            <th scope="col">birthday</th>
            <th scope="col">moniker</th>
            <th scope="col">description</th>
            <th scope="col">food</th>
            <th scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>
              <div class="row">
                <div class="col col-6"><button>U</button></div>
                <div class="col col-6"><button>R</button></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script></script>
<style>
th,
td {
  background-color: #4c5c81;
  border: 1px solid white;
  padding: 8px;
}
</style>
