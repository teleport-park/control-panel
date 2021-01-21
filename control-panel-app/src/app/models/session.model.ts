export class Session {
    public Id: string;
    public restarts: number;
    public updatedAt: Date;
    public createdAt: Date;
    public startedAt: Date;
    public pausedAt: Date;
    public stoppedAt: Date;
    public status: string;
    public restartCode: string;
    public restartMessage: string;
}
