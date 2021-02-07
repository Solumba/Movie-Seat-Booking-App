//Grabbing all the Dom elements we need
//get container
const container = document.querySelector('.container');
const freeSeats = document.querySelectorAll('.row .seat:not(.occupied)')
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
            console.log(e.target.selectedIndex);
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
        const seatsIndex = [...selectedSeats].map((seat) => {
            return [...freeSeats].indexOf(seat);
        });
        
        //store these indexes of our selected seats in local storage 
        localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    }

    static selectSeats(){
        container.addEventListener('click', (e) => {
            if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
                e.target.classList.toggle('selected');
            }
            UI.updateSelectedCount();
        });
    }
}
UI.selectSeats();
UI.getMoviePrice()