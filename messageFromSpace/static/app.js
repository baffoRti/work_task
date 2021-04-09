new Vue({
    el: '#mess',
    data: {
        messages: [],
        last_id: 0,
    },
    /*created: function() {
        const cur = this
        axios.get('/api/get_messages?last_id=0')
        .then(function(response) {
            cur.messages = response.data
        })
    },*/
    mounted: function() {
        /*axios.get('/api/get_messages?last_id=0')
        .then(function(response) {
            this.messages = response.data
            last_id = messages[0].pk
        })*/
        this.fetch_messages()
        setInterval(this.fetch_messages, 10000)
    },
    methods: {
        mark_read(id) {
            var url = "/api/mark_read?id=" + id
            axios.get(url)
            const idx = this.messages.findIndex(item => item.pk === id)
            this.messages = [...this.messages.slice(0, idx), ...this.messages.slice(idx+1)]
        },
        fetch_messages() {
            const async_fetch = async () => {
                const response = await axios.get('/api/get_messages?last_id=' + this.last_id)

                if (response.data.length > 0) {
                    this.messages = [...response.data, ...this.messages]
                    console.dir(this.messages)
                    console.log('messages')
                    this.last_id = this.messages[0].pk
                    console.log(this.messages)
                    console.log(this.last_id)
                }
            }
            async_fetch()
        }
    },
    filters: {
        date: function(val) {
            var new_val = ""
            for (i = 0; i < 10; i++) {
                new_val += val[i]
            }
            new_val += " "
            for (i = 11; i < 16; i++) {
                new_val += val[i]
            }
            return new_val
        }
    },
})