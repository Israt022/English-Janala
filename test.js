const createElement = (arr) => {
    const htmlElement = arr.map(el => `<span class="btn">${el}</span>`)

    console.log(htmlElement.join(" "));
}

const syn = ['hello','konnichiwa'];
createElement(syn);

/**
Use this prompt AFTER you choose your headline:
I like #__ above. Please expand upon this in the About section, which is up to 2600 characters. Please make sure the about section is focused on the buyer, their needs and how I can help them. Please write this in the first person. And start with a CTR - a call to read - which is an interesting (and verified) quote or statistic that will grab the attention of my buyer.
 */