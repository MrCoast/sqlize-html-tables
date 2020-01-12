export function createHtmlElement(htmlString) {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = htmlString.replace(/\n/g, '').trim();

    return wrapper.firstChild;
}
