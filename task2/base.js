var daily = new stateMachine({

    init: 'kill',

    transitions: [

        { name: 'kill' , from: 'killing',  to: 'deadSay' },

        { name: 'identify',  from: 'deadSay',  to: 'playSay' },

        { name: 'disscus',  from: 'playSay',  to: 'voted' },

        { name: 'vote',  from: 'voted',  to: 'voteDead' }

    ],
    methods: {

        onkill: function(obj) {
            obj.click(function () {
                var index = obj.index($(this));
                data[index].isdied = true;
            })
            console.log(data);
        },

        onidentify: function () { 'identifing ' },

        ondisscuss: function () { ' discussing' },

        onvote: function () { ' vote one people' },

    }

})