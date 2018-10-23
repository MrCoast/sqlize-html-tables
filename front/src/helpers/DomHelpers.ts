type MapCallback = (value: HTMLElement, index?: number, array?: HTMLCollectionOf<HTMLElement> | HTMLElement[]) => any;

export function mapHtmlCollection(htmlCollection: HTMLCollectionOf<HTMLElement> | HTMLElement[], callbackfn: MapCallback) {
    const newCollection: any[] = [];

    for (let elementIndex = 0; elementIndex < htmlCollection.length; ++elementIndex) {
        newCollection.push(callbackfn(htmlCollection[elementIndex], elementIndex, htmlCollection));
    }

    return newCollection;
}

export function htmlCollectionToArray(htmlCollection: HTMLCollectionOf<HTMLElement>) {
    const array: HTMLElement[] = [];

    for (let elementIndex = 0; elementIndex < htmlCollection.length; ++elementIndex) {
        array.push(htmlCollection[elementIndex]);
    }

    return array;
}
