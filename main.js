document.addEventListener("DOMContentLoaded", function(e){
    class Prilender {
        constructor(sliderId, direct){
            this.slider = document.getElementById(sliderId)
            this.sliderItems = document.querySelectorAll(`#${sliderId} .slider-item`);
            this.sliderHeight = getComputedStyle(this.slider).height;
            this.counter = 0;
            this.duration = (getComputedStyle(this.sliderItems[0]).transitionDuration).replace('s', '')*1000;
            this.directionMove = direct == 'top' ? true : false;

            if (!this.directionMove) {
                document.querySelector(`#${sliderId} .slider-content`).classList.add('revert');
            }            
            this.timer();
        }
        timer() {
            let previusPosition = 0;
            let timer = setInterval(()=>{
                previusPosition = this.counter;
                this.counter++;
                if (this.counter >= this.sliderItems.length) {
                    this.counter = 0;
                }                
                this.move(this.directionMove, this.counter, previusPosition);
            }, 3000)
        }
        stopTimer(timer) {
            clearInterval(timer);
        }
        move(direction, index, previus) {
            this.sliderItems[previus].classList.add( direction ? 'top' : 'bottom');
            this.sliderItems[index].classList.add('current');
            setTimeout(()=>{
                this.reMove(previus);
            }, this.duration)
        }
        reMove(index) {
            this.sliderItems[index].classList.remove('top', 'current', 'bottom')
        }
    }    
    new Prilender('slider-left', 'top');
    new Prilender('slider-right', 'bottom');
})