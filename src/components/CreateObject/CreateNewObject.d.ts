interface IRoles {
    id: number;
    title: string;
    directings: Array<IDirectings>;
}

interface IDirectings {
    id: string;
    tasks: Array<ITasks>;
    title: string;
}

interface ITasks {
    id: string;
    title: string;
    actions: Array<IActions>;
}

interface IActions {
    id: string;
    title: string;
}

