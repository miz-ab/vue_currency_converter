
Vue.config.devtools = true
new Vue({
    el:'#app',

    data:{
        curecies:{},
        amount: 0,
        from: 'USD', 
        to:'ETB',
        result:0,
        loading:false
    },
    
    mounted(){
        this.getCurrencies();
    },
    methods:{
        getCurrencies(){
            const curecies = localStorage.getItem('curenccies');
            if(curecies){
                this.curecies = JSON.parse(curecies);
                return;
            }
            axios.get('https://free.currconv.com/api/v7/currencies?apiKey=f8a28b1971834030f41d')
        .then(response =>{
            //console.log(response);
            this.curecies = response.data.results;

            localStorage.setItem('curenccies', JSON.stringify(response.data.results));
        });
        },
        convertCurrencies(){
            this.loading = true;
            const query = `${this.from}_${this.to}`;
            axios.get(`https://free.currconv.com/api/v7/convert?q=${query}&compact=ultra&apiKey=f8a28b1971834030f41d`)
            .then(response => {
                this.loading = false;
               // console.log(response.data[query]);
                this.result = response.data[query];
            });
        }
    },
    computed:{
        formattedcurrencies(){
            return Object.values(this.curecies);
        },
        calculateresult(){
            return (Number(this.amount) * this.result).toFixed(3);
        },
        isdisabled(){
            return this.amount === 0 || !this.amount || this.loading;
        }
    },
    watch:{
        from(){
            this.result = 0;
        },
        to(){
            this.result = 0;
        }
    }
})