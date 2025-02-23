declare namespace Geolocation{
    interface HttpApi{
        get<T>(url: string, configs?: Partial<{
            queryParams: Record<string, any>
        }>): Promise<{
            data: T
            status: number
        }>
    }

    interface HttpApiCreate{
        baseURL?: string
        serviceName: string
    }
}