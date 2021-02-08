//Grabbing all the Dom elements we need
//get container
const container = document.querySelector('.container');
const availableSeats = document.querySelectorAll('.row .seat:not(.occupied)')
const selectMovie = document.getElementById('movie'); 
const total  = document.getElementById('total');
const count = document.getElementById('count');

//the plus sign is to conver selectMovie value to a number
let ticketPrice = +selectMovie.value

//using event propagation method to target elements within the container
class UI {
    
    static getMoviePrice(){
        selectMovie.addEventListener('change', (e) => {
            ticketPrice = +e.target.value;
            const selectedMovieIndex = e.target.selectedIndex;
            const selectedMoviePrice = +e.target.value;
            localStorage.setItem('selectedMovieIndex', JSON.stringify(selectedMovieIndex));
            localStorage.setItem('selectedMoviePrice', JSON.stringify(selectedMoviePrice));
            UI.updateSelectedCount();
        })
    }

    static updateSelectedCount() {
        const selectedSeats = document.querySelectorAll('.row .seat.selected');
        count.innerText = selectedSeats.length;
        total.innerText = count.innerText * ticketPrice;

        //copy selected seats into an array
        const selectedSeatsIndex = [...selectedSeats].map((seat) => {
            return [...availableSeats].indexOf(seat);
        });
        
        //store these indexes of our selected seats in local storage 
        localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));
    }

    static selectSeats(){
        container.addEventListener('click', (e) => {
            if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
                e.target.classList.toggle('selected');
            }
            UI.updateSelectedCount();
        });
    }

    //populating the UI with data from the local storage so selections stay the same even when the page gets reloaded
    static populateUI() {
        const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
        if(selectedSeats !== null && selectedSeats.length > 0){
            availableSeats.forEach((seat, index) => {
                /*checking to see if the correct seats are in the index*/
                if(selectedSeats.indexOf(index) > -1) {
                    seat.classList.add('selected');

                    /* when you console.log this below you find that the available seats whose
                     indexes are not within the local storage return -1 console.log(selectedSeats.indexOf(index)); */
                    UI.updateSelectedCount();
                }

            })
        }
        const selectedMovieIndex = JSON.parse(localStorage.getItem('selectedMovieIndex'));
        if(selectedMovieIndex !== null) {
            selectMovie.selectedIndex = selectedMovieIndex;
        }
    }
}

UI.selectSeats();
UI.getMoviePrice()
UI.populateUI()