class Rating {
  constructor(ratingEl) {
    this.ratingEl = ratingEl

    setTimeout(() => {
      this.ratingEl.classList.add('rating--animatable')
    }, 0)

    this.ratingEl.addEventListener('click', this.onClick.bind(this))
  }

  get ratingButtons() {
    return [...this.ratingEl.querySelectorAll('.rating-button')]
  }

  get offButtons() {
    return this.ratingButtons.filter(
      (button) => !button.classList.contains('rating-button--active')
    )
  }

  onClick(e) {
    const target = e.target.matches('.rating-button')
      ? e.target
      : e.target.closest('.rating-button')
    if (!target) return

    this.ratingButtons.forEach((button) => {
      button.style.setProperty('--transition-delay', 0)
    })

    this.offButtons.forEach((button, index) => {
      const DELAY_UNIT = 100
      button.style.setProperty('--transition-delay', `${DELAY_UNIT * index}ms`)
    })

    const clickedButtonIndex = this.ratingButtons.indexOf(target)
    this.ratingButtons.forEach((button, index) => {
      if (index <= clickedButtonIndex) {
        button.classList.add('rating-button--active')
      } else {
        button.classList.remove('rating-button--active')
      }
    })
  }
}

Array.from(document.querySelectorAll('.rating')).forEach(
  (ratingEl) => new Rating(ratingEl)
)