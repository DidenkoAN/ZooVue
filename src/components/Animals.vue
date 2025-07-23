<template>
  <div class="container">
    <div class="row pb-5">
      <div class="col col-3"><h3>Animals</h3></div>
      <div class="col col-1"><button class="actBtn">Add</button></div>
      <div class="col col-6">
        <button class="actBtn">Removed</button>
      </div>
    </div>
    <div class="row pt-5 pb-3 text-center">
      <div class="col col-6">
        <label class="col col-4">Filter</label>
        <input type="text" class="col col-4" />
      </div>
      <div class="col col-6">
        <label class="col col-4">Filter</label>
        <input type="text" class="col col-4" />
      </div>
    </div>

    <div>
      <table class="my-3 container text-center">
        <thead>
          <tr class="row">
            <th class="col col-1" scope="col">id</th>
            <th class="col col-8" scope="col">kind_of_animal</th>
            <th class="col col-3" scope="col">actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="row">
            <th class="col col-1" scope="row">1</th>
            <td class="col col-8">@mdo</td>
            <td class="col col-3">
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
