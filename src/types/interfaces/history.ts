export interface History {
    id?: string;
    action: "added" | "updated" | "deleted";
    authorId: string;
    message: string;
    reason?: string;
    date: Date;
}
