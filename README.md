# animation-on-scroll

A small library to add animation on scroll using the IntersectionOberver API. It is in development and use tailwind css
class

## Installation

Add the package to your package.json and import the function

## Usage

**Reminder : it is an early version**

1. Add a class name in the html element that will be use to add animation on scroll.
2. Define css classes that will be added **before** the html element appear on screen. I'm using tailwind for the
   exemple
3. Call the function ``addAnimationOnScroll(className, startClasses)`` on the event listener `DOMContentLoaded`

Ex :

```html

<li class="fade-left">
    <p></p>
</li>
```

```javascript
document.addEventListener('DOMContentLoaded', function () {
    addAnimationOnScroll('fade-left', ['opacity-0', '-translate-x-full']);
    addAnimationOnScroll('fade-right', ['opacity-0', 'translate-x-full']);
    addAnimationOnScroll('zoom-out', ['opacity-0', 'scale-0']);
});
```

Here, the element will appear by sliding from left to right

## How it works

The function create a new IntersectionObserver for every element found with the className parameters

```javascript
const els = document.querySelectorAll(`.${className}`);

const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Apply end state
            startClasses.forEach((c) => entry.target.classList.remove(c));
            // Only run once per element
            io.unobserve(entry.target);
        }
    });
}, {
    root: null,
    rootMargin: '0px 0px -15% 0px',
    threshold: 0
});
```

The reason of the rootMargin is to make the appearing not too early. It will be customisable eventually. Now you might
wonder why not using the threshold parameter. I encounter a bug when the element is the last child of a parent as the
threshold make the element root behind his higher sibling. Make it never intersecting.

## Things to implements

- Use parameterrs to change the rootMargin
- Use parameters to change speed duration/animation/
- Remove tailwind css classes usage
- Use data-** atttributs to configure animation
- Add some 'prefab' animation for simple and frequently used animation
- Make the librairy usable by only importing amn Object. Ex:

```javascript
import AnimationOnScroll from '@terry-turcotte/animation-on-scroll';

AnimationOnScroll.init({
    // Some global configuration
})
```