export const randoms = (cant) => {
    let obj = {};
    for (let i = 0; i < cant; i++) {
      let myKey = Math.round(Math.random() * (cant - 1) + 1);
      if (myKey in obj) {
        obj[myKey]++;
      } else obj[myKey] = 1;
    }
    return obj;
  };

 process.on('message', (msg) => {
    msg = JSON.parse(msg);
    if (msg.msg == 'start') {
      console.log('Start calculo');
      const result = randoms(msg.cantidad);
      process.send(result);
      process.exit(0)
  
    //   if (process && process.send) {
    //   }
    }
  });
  