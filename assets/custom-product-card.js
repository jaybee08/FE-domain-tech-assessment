(function () {
  function setHoverState(card) {
    const secondaryImage = card.querySelector('[data_secondary_image], [data-secondary-image]');
    const primaryImage = card.querySelector('[data_primary_image], [data-primary-image]');

    if (!primaryImage) return;

    if (secondaryImage && secondaryImage.getAttribute('src')) {
      card.classList.add('has-secondary-hover');
    } else {
      card.classList.remove('has-secondary-hover');
    }
  }

  function updateSwatchState(swatches, activeButton) {
    swatches.forEach((swatch) => {
      const isActive = swatch === activeButton;
      swatch.classList.toggle('is-active-swatch', isActive);
      swatch.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  function updateCard(card, button) {
    const saleBadge = card.querySelector('[data-sale-badge]');
    const vendorEl = card.querySelector('[data-product-vendor]');
    const titleEl = card.querySelector('[data-product-title]');
    const priceEl = card.querySelector('[data-price]');
    const comparePriceEl = card.querySelector('[data-compare-price]');
    const primaryImage = card.querySelector('[data_primary_image], [data-primary-image]');
    const secondaryImage = card.querySelector('[data_secondary_image], [data-secondary-image]');
    const links = card.querySelectorAll('[data-product-link]');

    const nextTitle = button.dataset.title || '';
    const nextVendor = button.dataset.vendor || '';
    const nextPrice = button.dataset.price || '';
    const nextComparePrice = button.dataset.comparePrice || '';
    const nextPrimaryImage = button.dataset.primaryImage || '';
    const nextPrimaryAlt = button.dataset.primaryAlt || nextTitle;
    const nextSecondaryImage = button.dataset.secondaryImage || '';
    const nextSecondaryAlt = button.dataset.secondaryAlt || nextTitle;
    const nextUrl = button.dataset.variantUrl || '';
    const isOnSale = button.dataset.onSale === 'true' && nextComparePrice && nextComparePrice !== nextPrice;

    if (vendorEl) vendorEl.textContent = nextVendor;
    if (titleEl) titleEl.textContent = nextTitle;

    if (priceEl) {
      priceEl.textContent = nextPrice;
      priceEl.classList.toggle('text-[#FF2A1F]', isOnSale);
      priceEl.classList.toggle('text-[#111111]', !isOnSale);
    }

    if (comparePriceEl) {
      if (isOnSale) {
        comparePriceEl.textContent = nextComparePrice;
        comparePriceEl.classList.remove('hidden');
      } else {
        comparePriceEl.textContent = '';
        comparePriceEl.classList.add('hidden');
      }
    }

    if (saleBadge) {
      saleBadge.classList.toggle('hidden', !isOnSale);
    }

    if (primaryImage && nextPrimaryImage) {
      primaryImage.src = nextPrimaryImage;
      primaryImage.alt = nextPrimaryAlt;
    }

    if (secondaryImage) {
      if (nextSecondaryImage) {
        secondaryImage.src = nextSecondaryImage;
        secondaryImage.alt = nextSecondaryAlt;
        secondaryImage.style.display = 'block';
      } else {
        secondaryImage.removeAttribute('src');
        secondaryImage.style.display = 'none';
      }
    }

    if (nextUrl) {
      links.forEach((link) => link.setAttribute('href', nextUrl));
    }

    setHoverState(card);
  }

  function initCard(card) {
    if (!card || card.dataset.productCardReady === 'true') return;
    card.dataset.productCardReady = 'true';

    const swatches = Array.from(card.querySelectorAll('[data-swatch]'));

    swatches.forEach((button) => {
      button.addEventListener('click', function () {
        updateSwatchState(swatches, button);
        updateCard(card, button);
      });
    });

    setHoverState(card);
  }

  function initAll(scope) {
    (scope || document).querySelectorAll('[data-product-card]').forEach(initCard);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initAll(document);
  });

  document.addEventListener('shopify:section:load', function (event) {
    initAll(event.target);
  });
})();
