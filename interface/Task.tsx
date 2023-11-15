export interface Task {
    _id: string;
    title: string;
    description: string;
    datetime: Date | undefined;
}