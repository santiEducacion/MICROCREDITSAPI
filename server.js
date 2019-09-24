const app = require("./app");
const CONFIG = require("./config/config");
console.log(CONFIG)
app.listen(CONFIG.PORT, () => {
  console.log("servidor inicializado " + CONFIG.PORT);
});

/*En config, se establecen los parametros de configuración del servidor 
y en Server se inicializa el servidor y otros parametros del mismo por eso importa Config*/