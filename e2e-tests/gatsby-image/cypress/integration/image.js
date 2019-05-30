const fluidTestId = `image-fluid`
const placeholderImage = `picture:nth-of-type(1)`

describe(`Production gatsby-image`, () => {
  beforeEach(() => {
    cy.visit(`/fluid`).waitForRouteChange()
  })

  describe(`wrapping elements`, () => {
    describe(`outer div`, () => {
      it(`exists`, () => {
        cy.getTestElement(fluidTestId)
          .find(`.gatsby-image-wrapper`)
          .its(`length`)
          .should(`eq`, 1)
      })

      it(`contains position relative`, () => {
        cy.getTestElement(fluidTestId)
          .find(`.gatsby-image-wrapper`)
          .should(`have.attr`, `style`)
          .and(`contains`, `position:relative`)
      })
    })
  })

  describe(`fallback image`, () => {
    it(`renders base-64 src`, () => {
      cy.getTestElement(fluidTestId)
        .find(`${placeholderImage} img`)
        .should(`have.attr`, `src`)
        .and(`contains`, `base64`)
    })

    it(`renders with style`, () => {
      cy.getTestElement(fluidTestId)
        .find(`${placeholderImage} img`)
        .should(`have.attr`, `style`)
    })

    it(`swaps opacity to 0`, () => {
      cy.getTestElement(fluidTestId)
        .find(`${placeholderImage} img`)
        .should(`have.attr`, `style`)
        .and(`contains`, `opacity: 0`)
    })
  })

  it(`renders a picture tag`, () => {
    cy.getTestElement(fluidTestId)
      .find(`picture`)
      .its(`length`)
      .should(`eq`, 1)
  })

  it(`renders a picture > source`, () => {
    cy.getTestElement(fluidTestId)
      .find(`picture > source`)
      .should(`have.attr`, `srcset`)
  })

  it(`renders fallback img`, () => {
    cy.getTestElement(fluidTestId)
      .find(`picture > img`)
      .should(`have.attr`, `src`)
  })

  it(`applies inline style to img`, () => {
    cy.getTestElement(fluidTestId)
      .find(`picture > img`)
      .should(`have.attr`, `style`)
      .and(style => {
        const split = style
          .split(`;`)
          .map(part => part.trim())
          .filter(Boolean)
        expect(split).to.include.members([
          `position: absolute`,
          `top: 0px`,
          `left: 0px`,
          `width: 100%`,
          `height: 100%`,
          `object-fit: cover`,
        ])
      })
  })

  describe(`noscript`, () => {
    it(`exists`, () => {
      cy.getTestElement(fluidTestId)
        .find(`noscript`)
        .its(`length`)
        .should(`eq`, 1)
    })

    it(`renders string content with picture tag`, () => {
      cy.getTestElement(fluidTestId)
        .find(`noscript`)
        .and(noscript => {
          const content = noscript[0].textContent
          expect(content).to.contain(`<picture>`)
        })
    })
  })
})
