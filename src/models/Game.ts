export class Game
{
    private _id: number = -1;
    private _cost: number = 0.0;
    private _genre: string = "";
    private _title: string = "";

    constructor(__id: number, __cost: number, __genre: string, __title: string) 
    {
        this._id = __id;
        this._cost = __cost;
        this._genre = __genre;
        this._title = __title
    }

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get title(): string {
        return this._title;
    }
    public set title(value: string) {
        this._title = value;
    }

    public get genre(): string {
        return this._genre;
    }
    public set genre(value: string) {
        this._genre = value;
    }

    public get cost(): number {
        return this._cost;
    }
    public set cost(value: number) {
        this._cost = value;
    }
}