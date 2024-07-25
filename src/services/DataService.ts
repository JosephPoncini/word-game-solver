export async function postData(data: RequestData): Promise<ResponseData> {
    
    const url = 'https://poncini-wordle-solver.azurewebsites.net/api/data';

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

// Usage

export const getWordleData = async (word:string, code:string, wordBank:string[]) => {
    const data = {
        word: word,
        code: code,
        word_bank: wordBank
    };

    try {
        const response = await fetch('https://poncini-wordle-solver.azurewebsites.net/api/wordle_get_data', {
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
};


// Word Hunt

export const getWordHuntData = async (board:string[][]) => {
    const data = {
        board: board,
    };

    try {
        const response = await fetch('https://poncini-wordle-solver.azurewebsites.net/api/word_hunt_get_data', {
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