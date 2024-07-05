export async function postData(data: RequestData): Promise<ResponseData> {
    
    const url = 'http://127.0.0.1:5000/api/data';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData: ResponseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

// export const getWordleData = async (word:string, code:string, wordBank:string[]) => {
//     const url = new URL('http://127.0.0.1:5000/api/wordle_get_data');
//     url.searchParams.append('word', word);
//     url.searchParams.append('code', code);
//     wordBank.forEach(word => url.searchParams.append('word_bank', word));

//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error fetching wordle data:', error);
//         throw error;
//     }
// };

// Usage

export const getWordleData = async (word:string, code:string, wordBank:string[]) => {
    const data = {
        word: word,
        code: code,
        word_bank: wordBank
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/api/wordle_get_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching wordle data:', error);
        throw error;
    }
};

export const fetchWordBank = async () => {

    let promise = await fetch('/data/word_bank.json');
    let data = await promise.json();

    console.log(data);

    return data

    // try {
    //     const response = await fetch('../data/word_bank.json'); // Path to your JSON file
    //     if (!response.ok) {
    //         throw new Error(`HTTP error! status: ${response.status}`);
    //     }

    //     const wordBankArray = await response.json(); // Parse JSON file to JavaScript array
    //     return wordBankArray;
    // } catch (error) {
    //     console.error('Error fetching word bank:', error);
    //     throw error;
    // }
};
