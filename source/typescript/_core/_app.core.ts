export interface Model { }
export interface View {
    render: (__ClientData__: any) => Promise<void>;
}
export interface Controller { }
