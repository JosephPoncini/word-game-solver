interface RequestData {
    name: string;
    age: number;
}

interface ResponseData {
    message: string;
    data: {
        name: string;
        age: number;
    };
    status: string;
}