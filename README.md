# Medium Style progressively loaded images with infinite scrolling

### About

This is a simple application that is deceptively hard to build. What we are striving for is an infinite scrolling image viewing application.  To source our images we will use the Unsplash API.  You will need your own Unsplash API key (more detail below).  We will use the API to retrieve images from Unsplash.  

### Design Aspects

* Let's use a dark background to make the pictures pop. We don't want to use pure black because you never really use pure black as it's too harsh. We will use a nice dark neutral grey with balanced colors.
* Images are centered and have a narrow separation that creates a feeling of a seamless list but keeps each image separate.
* We want to have a Medium style "blur up" capability to load our images in a visually elegant manner.
* Images will only be loaded as they are scrolled into the viewport. This keeps the initial page load very fast and does not use any unnecessary bandwidth to load images the user may never view.

### Program Logic

* Use a Netlify lambda function to cache the unsplash API. The lambda function calls the Unsplash API retrieveing the latest images, six at a time. E.g. `https://api.unsplash.com/photos?page=${page}&per_page=6&order_by=latest` and caches the results.
* Use a *preload* in the Head to retrieve the first page of API results as soon as the page begins to load. This is a performance optimization.
* Use `IntersectionObserver` to lazy load the images.  We will create a custom React hook called "use-intersectiion-observer.js".  Lazy loading the images is a big performance and bandwidth improvement because only images that the user will view are loaded.
* As we load the image we will use only CSS to "blur up" the image.
* Infinite scrolling is accomplished by retrieving a "page" of 6 images through the Unsplash API and *appending* them to the images we have already retrieved. If the visible image is the next to last image in our list, then increment the page, which kicks off another API call, which appends six more images. Thus infinite scrolling!

### How to run it locally

* Clone the repo
* Install the dependencies using `yarn install` or `npm install`.
* create a `.env` file using the example with *your* Unsplash API key.
* Open two terminal windows.  In the first, run the Netlify lambda function using `yarn/npm lambda`.  In the second run `yarn/npm start`.
  
### Notes

The app uses React (a Facebook open source library) and is deployed on Netlify.  It uses Netlify for its CI/CD pipeline.  As with everything I build it has a full test suite and is fully fluid and will adjust to the viewport size. 

Make sure if you deploy to netlify you setup your unsplash API key. Put it in a ".env" file and make sure it is ignored in .gitignore: `UNSPLASH_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxx`

Build the lambda function with: `y lambda-build`
Run it locally with `y lambda`

### TODO

* [x] Cache for ony a period of time
* [x] Add tests
