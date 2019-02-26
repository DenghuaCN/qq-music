export class Slider {
    constructor(options = {}) {
        this.$el = options.el;
        this.slides = options.slides;
        this.interval = options.interval || 3000;
        this.index = 0;

        this.render();
        this.start();
    }

    render() {
        this.$el.innerHTML = '<div class="qq-slider-wrap"></div>'
        this.$wrap = this.$el.firstElementChild;
        this.$wrap.style.width = `${this.slides.length * 100}%`;

        let slide = function(obj) {
            return `<div class="qq-slider-item">
                <a href="${obj.link}">
                    <img src="${obj.image}">
                </a>
            </div>`
        }
        this.$wrap.innerHTML = this.slides.map(slide).join('');
    }

    start() {
        setInterval(this.next.bind(this), this.interval);
    }

    next() {
        this.index += 1;
        if (this.index === this.slides.length) {
            this.$wrap.style.transform = `translate(0)`;
            this.index = 0;
        }

        let x = `-${this.index * 100 / this.slides.length}%`
        this.$wrap.style.transform = `translate(${x})`;
    }

}