import { ObjectId } from "mongodb";
import { Series } from "./types";

export const TEST_SERIES_LIST : Series[] = [
    {
        _id: new ObjectId("60f1b3b3e6f3b3b3b3b3b3b3"),
        title: "Dummy Series 1",
        url: "https://www.dummyseries1.com",
        description: "This is a dummy series 1",
        rating: 8.5,
        genre: "Action",
    },
    {
        _id: new ObjectId("60f1b3b3e6f3b3b3b3b3b3b4"),
        title: "Dummy Series 2",
        url: "https://www.dummyseries2.com",
        description: "This is a dummy series 2",
        rating: 7.5,
        genre: "Biography",
    },
    {
        _id: new ObjectId("60f1b3b3e6f3b3b3b3b3b3b5"),
        title: "Dummy Series 3",
        url: "https://www.dummyseries3.com",
        description: "This is a dummy series 3",
        rating: 6.5,
        genre: "Comedy",
    },
    {
        _id: new ObjectId("60f1b3b3e6f3b3b3b3b3b3b6"),
        title: "Dummy Series 4",
        url: "https://www.dummyseries4.com",
        description: "This is a dummy series 4",
        rating: 5.5,
        genre: "Action",
    },
    {
        _id: new ObjectId("60f1b3b3e6f3b3b3b3b3b3b7"),
        title: "Dummy Series 5",
        url: "https://www.dummyseries5.com",
        description: "This is a dummy series 5",
        rating: 4.5,
        genre: "Biography",
    },
    {
        _id: new ObjectId("60f1b3b3e6f3b3b3b3b3b3b8"),
        title: "Dummy Series 6",
        url: "https://www.dummyseries6.com",
        description: "This is a dummy series 6",
        rating: 3.5,
        genre: "Comedy",
    },
    {
        _id: new ObjectId("60f1b3b3e6f3b3b3b3b3b3b9"),
        title: "Dummy Series 7",
        url: "https://www.dummyseries7.com",
        description: "This is a dummy series 7",
        rating: 2.5,
        genre: "Action",
    },
    {
        _id: new ObjectId("60f1b3b3e6f3b3b3b3b3b3b0"),
        title: "Dummy Series 8",
        url: "https://www.dummyseries8.com",
        description: "This is a dummy series 8",
        rating: 1.5,
        genre: "Biography",
    },
];

//Implementeer de getSeriesWithHighestRating in utils.ts aan de hand van een reduce functie.
export function getSeriesWithHighestRating(seriesList: Series[]): Series {
    let highest : Series;
    highest = TEST_SERIES_LIST.reduce((high, current) => high.rating < current.rating ? high : current);
    return highest;
}

//Implementeer de getSeriesByGenre in utils.ts aan de hand van een filter functie.
export function getSeriesByGenre(seriesList: Series[], genre: string): Series[] {
    let filtered : Series[] = TEST_SERIES_LIST.filter( (serie: Series) => serie.genre === genre);
    return filtered;
}