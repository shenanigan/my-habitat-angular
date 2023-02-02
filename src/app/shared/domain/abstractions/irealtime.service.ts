export interface IRealTimeService {
    close(): unknown;
    listen(): void;
    listenToHO(homeOwnerId: string): void;
}