# NOTES

## 1. Exercise 1.1 

When I removed `position: relative` from the avatar wrapper, the badge moved away from the avatar and appeared in the right most  position of the page. It was positioned to the page itself. 

## 2. Exercise 1.5 

The card got stuck behind its sibling even when I gave it `z-index: 9999`. The wrapper around the card had created its own stacking context. So even if I increased the value of z-index its effect stayed within the wrapper.

## 3. Exercise 5.1 

I first used `key={index}` for the product rows and increased the quantity of the product at the bottom to 7. After clicking the sort button, the products changed positions but the quantity 7 stayed in the same position and was shown for a different product. When I changed the key to `key={product.id}`, the quantity stayed with the correct product after sorting. 

## 4. Filter state in the URL

Keeping the filter values in the URL means I can copy the filtered URL and open it in another tab with the same filters. I can also refresh the page or share the URL with someone and the same search, category and sort will still be applied. 

## 5. Local state vs Zustand

The modal open and close state was something I could have put in Zustand, but I kept it in local `useState`. The modal only needed to be controlled by the component using it, so there was no reason to make it global. Keeping it local also makes the component easier to understand and reuse.

## 6. What I am least confident about

I am still least confident about understanding stacking contexts. I also need more practice with React Router guards and understanding how the different routes and layouts work together.