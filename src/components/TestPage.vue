<template>
  <div class="container">
    <div
      class="accordion d-flex justify-content-center align-items-center height"
      id="accordionExample">
      <div class="row">
        <div class="col-md-6">
          <div class="p-3">
            <ul class="testimonial-list">
              <li>
                <div
                  class="card p-3"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne">
                  <div class="d-flex flex-row align-items-center">
                    <img
                      src="https://i.imgur.com/G1pXs7D.jpg"
                      width="50"
                      class="rounded-circle" />
                    <div class="d-flex flex-column ml-2">
                      <span class="font-weight-normal">Milton Austin</span>
                      <span>Sales Manager, Stack</span>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div
                  class="card p-3"
                  data-toggle="collapse"
                  data-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo">
                  <div class="d-flex flex-row align-items-center">
                    <img
                      src="https://i.imgur.com/udGH5tO.jpg"
                      width="50"
                      class="rounded-circle" />

                    <div class="d-flex flex-column ml-2">
                      <span class="font-weight-normal">John Reeves</span>
                      <span>Head of Sales, Asana</span>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div
                  class="card p-3"
                  data-toggle="collapse"
                  data-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree">
                  <div class="d-flex flex-row align-items-center">
                    <img
                      src="https://i.imgur.com/Uz4FjGZ.jpg"
                      width="50"
                      class="rounded-circle" />

                    <div class="d-flex flex-column ml-2">
                      <span class="font-weight-normal">Luke Harper</span>
                      <span>Sales Team Lead,Sketch</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="col-md-6">
          <div class="p-3 testimonials-margin">
            <div
              id="collapseOne"
              class="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionExample">
              <div class="card-body">
                <h4>It was a great experience</h4>
                <div class="ratings">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </div>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </p>
              </div>
            </div>

            <div
              id="collapseTwo"
              class="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample">
              <div class="card-body">
                <h4>Thanks for this great service</h4>
                <div class="ratings">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </div>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </p>
              </div>
            </div>

            <div
              id="collapseThree"
              class="collapse"
              aria-labelledby="headingThree"
              data-parent="#accordionExample">
              <div class="card-body">
                <h4>You all are awesome thanks alot</h4>
                <div class="ratings">
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                  <i class="fa fa-star"></i>
                </div>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit, sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestimonialPage",
};
</script>

<style scoped>
body {
  background-color: #fff;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
}

@media only screen and (max-width: 768px) {
  .container {
    margin-top: 66px;
  }
}

.height {
  height: 100vh;
}

.card {
  border: none;
  cursor: pointer;
  box-shadow: 0 0 40px rgba(51, 51, 51, 0.1);
}

.card:hover {
  background-color: #eee;
}

.ratings i {
  color: orange;
}

.testimonial-list {
  list-style: none;
}

.testimonial-list li {
  margin-bottom: 20px;
}

.testimonials-margin {
  margin-top: -19px;
}
</style>
