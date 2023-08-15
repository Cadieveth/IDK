<template>
  <body>
    <div class="main">
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div class="signup">
        <!-- penggunaan form dilihat sesuai kondisi -->
        <!-- <form @submit.prevent="login"> -->
        <label for="chk" aria-hidden="true">Login</label>
        <input
          v-model="jUser"
          type="text"
          name="jUser"
          placeholder="Username"
          required="" />
        <input
          v-model="jPass"
          type="password"
          name="jPass"
          placeholder="Password"
          required="" />
        <button @click="login">Login</button>
        <p v-if="errorMsg" style="color: white">{{ errorMsg }}</p>
        <!-- </form> -->
      </div>

      <div class="login">
        <form>
          <label for="chk" aria-hidden="true">Sign up</label>
          <input
            type="text"
            name="txt"
            placeholder="Username"
            required=""
            v-model="jUser" />
          <input type="email" name="email" placeholder="Email" required="" />
          <input
            type="password"
            name="pswd"
            placeholder="Password"
            required="" />
          <button>Sign up</button>
        </form>
      </div>
    </div>
  </body>
</template>

<script>
export default {
  data() {
    return {
      jUser: "",
      jPass: "",
      errorMsg: "",
    };
  },
  methods: {
    // Metode Login dengan API
    async login() {
      if (!this.jUser || !this.jPass) {
        this.errorMsg = "Masukin username dan pw dulu Setan!";
      } else {
        // Coba codingan yang dikirim Joy
        try {
          const config = {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers":
                "Origin, X-Requested-With, Content-Type, Accept",
            },
          };

          // Enctyption password pake codingan Joy
          const encryptedPassword = window.btoa(this.jPass);

          // Penyesuaian kebutuhan data, disini pake username sama pw
          const requestData = {
            jUser: this.jUser,
            jPass: encryptedPassword,
          };

          // Request HTTP dengan Fetch API
          const response = await fetch(
            "https://stagingmkpops.mkpmobile.com/ssoauth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...config.headers,
              },
              body: JSON.stringify(requestData),
            }
          );

          // Handle respon dari API (ambil methods login sebelumnya)
          // Jika ok bagaimana? Ini kondisinya
          // if (response.ok) {
          //   //Metode tanpa generate token
          //   localStorage.setItem("isAuthenticated", "true");
          //   //Redirect ke halaman home ("/home")
          //   if (localStorage.getItem("isAuthenticated") === "true") {
          //     if (this.$route.path !== "/home") {
          //       const token = this.generateToken();
          //       localStorage.setItem("accessToken", token);
          //       this.$router.push("/home");
          //     }
          //   }

          // Kalo pake const token = localStorage.getItem("accessToken");
          // if (response.ok) {
          //   console.log(response);
          //   localStorage.setItem("isAuthenticated", "true");
          //   const token = this.generateToken();
          //   localStorage.setItem("accessToken", token);
          //   this.$router.push("/home");
          // } else {
          //   const errorData = await response.json();
          //   this.errorMsg = errorData.message || "Login gagal";
          // }

          // Kalo pake const token = this.$session.get("accessToken");
          // if (response.ok) {
          //   console.log(response);
          //   this.$session.set("isAuthenticated", true);
          //   const token = this.generateToken();
          //   this.$session.set("accessToken", token);
          //   this.$router.push("/home");
          // } else {
          //   const errorData = await response.json();
          //   this.errorMsg = errorData.message || "Login gagal";
          // }

          // Metode if kalo response: ok
          if (response.ok) {
            console.log(response);
            localStorage.setItem("isAuthenticated", "true");
            const responseData = await response.json();
            // ambil token dari result API
            const token = responseData.result.token;
            // simpan di LS dngn nama accessToken
            localStorage.setItem("accessToken", token);
            this.$router.push("/home");
          } else {
            const errorData = await response.json();
            this.errorMsg = errorData.message || "Login gagal";
          }
        } catch (error) {
          this.errorMsg = "username atau password salah!";
        }
      }
    },

    // generateToken() {
    //   // Generate a token using your preferred method
    //   // For example, you can use a library like jwt-simple or any other method
    //   const token = "your_generated_token_here";
    //   return token;
    // },
  },
  created() {
    if (localStorage.getItem("accessToken")) {
      this.$router.push("/home");
    }
  },

  // created() {
  //   if (
  //     localStorage.getItem("isAuthenticated") === "true" &&
  //     localStorage.getItem("accessToken")
  //   ) {
  //     this.$router.push("/home");
  //   }
  // },

  // Ini buat ngecek si user udh auth atau belum? kalo udah direct ke /home
  // created() {
  //   if (localStorage.getItem("isAuthenticated") === "true") {
  //     if (localStorage.getItem("accessToken")) {
  //       this.$router.push("/home");
  //     }
  //   }
  // },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: "Jost", sans-serif;
  background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e);
}
.main {
  width: 350px;
  height: 500px;
  background: red;
  overflow: hidden;
  background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38")
    no-repeat center/ cover;
  border-radius: 10px;
  box-shadow: 5px 20px 50px #000;
}
#chk {
  display: none;
}
.signup {
  position: relative;
  width: 100%;
  height: 100%;
}
label {
  color: #fff;
  font-size: 2.3em;
  justify-content: center;
  display: flex;
  margin: 60px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.5s ease-in-out;
}
input {
  width: 60%;
  height: 20px;
  background: #e0dede;
  justify-content: center;
  display: flex;
  margin: 20px auto;
  padding: 10px;
  border: none;
  outline: none;
  border-radius: 5px;
}
button {
  width: 60%;
  height: 40px;
  margin: 10px auto;
  justify-content: center;
  display: block;
  color: #fff;
  background: #573b8a;
  font-size: 1em;
  font-weight: bold;
  margin-top: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
  transition: 0.2s ease-in;
  cursor: pointer;
}
button:hover {
  background: #6d44b8;
}
.login {
  height: 460px;
  background: #eee;
  border-radius: 60% / 10%;
  transform: translateY(-180px);
  transition: 0.8s ease-in-out;
}
.login label {
  color: #573b8a;
  transform: scale(0.6);
}

#chk:checked ~ .login {
  transform: translateY(-500px);
}
#chk:checked ~ .login label {
  transform: scale(1);
}
#chk:checked ~ .signup label {
  transform: scale(0.6);
}

/* cyrillic */
@font-face {
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/jost/v14/92zPtBhPNqw79Ij1E865zBUv7myRJTVFNIg8mg.woff2)
    format("woff2");
  unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
}
/* latin-ext */
@font-face {
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/jost/v14/92zPtBhPNqw79Ij1E865zBUv7myRJTVPNIg8mg.woff2)
    format("woff2");
  unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
    U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
}
/* latin */
@font-face {
  font-family: "Jost";
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url(https://fonts.gstatic.com/s/jost/v14/92zPtBhPNqw79Ij1E865zBUv7myRJTVBNIg.woff2)
    format("woff2");
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
    U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
    U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
</style>
