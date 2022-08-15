var data = { free: {}, pro: {}, enterprise: {} };


var pricing = new Vue({
  el: '#pricing',
  data: { data },
  mounted () {
    data.free = {};
    data.pro = {};
    data.enterprise = {};
    getPriceFree();
    getPricePro();
    getPriceEnterprise();
  },
  methods:{
  }
})

function getPriceFree(callback) {
    axios
      .get('/free')
      .then(resp => 
            {        
                data.free = resp.data.price;
                return callback;
            }
        )
     .catch(error => {
            console.log(error)
        })
     .finally(() => { 
            console.log("Price free " + data.free.monthly);
        })
}

function getPricePro(callback) {
    axios
      .get('/pro')
      .then(resp => 
            {        
                data.pro = resp.data.price;
                return callback;
            }
        )
     .catch(error => {
            console.log(error)
        })
     .finally(() => { 
            console.log("Price pro " + data.pro.monthly);
        })
}

function getPriceEnterprise(callback) {
    axios
      .get('/enterprise')
      .then(resp => 
            {        
                data.enterprise = resp.data.price;
                return callback;
            }
        )
     .catch(error => {
            console.log(error)
        })
     .finally(() => { 
            console.log("Price enterprise " + data.enterprise.monthly);
        })
}