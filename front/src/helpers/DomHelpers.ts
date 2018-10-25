export function htmlCollectionToArray(htmlCollection: HTMLCollectionOf<any>) {
    const array: any[] = [];

    for (let elementIndex = 0; elementIndex < htmlCollection.length; ++elementIndex) {
        array.push(htmlCollection[elementIndex]);
    }

    return array;
}
