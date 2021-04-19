const LOCAL_STORAGE_KEY = "locations";

export function saveToLocalStorage(locations) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(locations));
}

export function readFromLocalStorage() {
    const storedLocations = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedLocations
        ? JSON.parse(storedLocations)
        : ["Kyiv", "Warsaw", "Rome", "London", "Washington", "New York"];
}

export function capitalizeString(string) {
    let words = string.split(" ");
    words = words.map(
        (element) => element.charAt(0).toUpperCase() + element.slice(1)
    );
    return words.join(" ");
}

export function isLetter(str) {
    // debugger
    return str.length >= 2 && str.match(/^[a-zA-Z]*$/i);
  }


// export function generateRandomColor(previousColor) {
//     let color = Math.floor(Math.random() * 8 + 2);
//     while (color === previousColor) {
//         color = Math.floor(Math.random() * 8 + 2);
//     }
//     previousColor = color;
//     return color;
// }