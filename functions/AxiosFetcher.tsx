import axios from "axios";
export async function AxiosFetcher(url: string) {
    let fetcher = null;

    try {
        fetcher = await axios.get(url, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        });
        if (fetcher) {
            return fetcher.data;
        }
    } catch (error) {
        console.log(error);
    }
    return fetcher;
}