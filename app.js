new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
 
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {

            this.hayUnaPartidaEnJuego= true;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = [];
        },
        atacar: function () {

            var daño = this.calcularHeridas(this.rangoAtaque);
            this.saludMonstruo  -= daño;
            this.turnos.unshift({

                esJugador: true,
                text: 'El jugador golpea al mounstro por ' + daño


            } );
            

             if(this.verificarGanador()){
                return;
            }
 
            this.ataqueDelMonstruo();
        },

    

        ataqueEspecial: function () {
            var daño = this.calcularHeridas(this.rangoAtaqueEspecial);
            this.saludMonstruo -= daño;

            this.turnos.unshift({

                esJugador: true,
                text: 'El jugador golpea al mounstro por ' + daño


            } );

            if(this.verificarGanador()){
                return;
            }
            this.ataqueDelMonstruo();




        },

        curar: function () {
 
            if(this.saludJugador <= 90){
        
                this.saludJugador += 10;
            }else{
                this.saludJugador = 100;
            }
            this.turnos.unshift({

                esJugador: true,
                text: 'El jugador recupera 10 puntos de energía'


            } );


            this.ataqueDelMonstruo();
        },

        registrarEvento(evento) {
        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos = []
        },

        ataqueDelMonstruo: function () {
            var daño = this.calcularHeridas(this.rangoAtaqueDelMonstruo);
            this.saludJugador -= daño;
            this.turnos.unshift({

                esJugador: false,
                text: 'El mounstro lastima al jugador por ' + daño


            } );
            this.verificarGanador();
        },

        calcularHeridas: function (rango) {
            return  Math.max(Math.floor(Math.random() * rango[1]) +1 , rango[0]);


        },
        verificarGanador: function () {
            if(this.saludMonstruo  <= 0){
                
                 if(confirm('Ganaste! jugar de nuevo?')){

                    this.empezarPartida();

                }else{
                    this.hayUnaPartidaEnJuego = false;
                }

                 return true;
            }else if(this.saludJugador <= 0){
                 if(confirm('Perdiste! empezar de nuevo?')){
                    this.empezarPartida();
                }else{
                    this.hayUnaPartidaEnJuego = false;
                }
                return true;

                
            }
            return false;
 
         },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});