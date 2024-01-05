export const responseData = (statusCode: number, message: string, data: any) => {
    return {
        statusCode,
        message,
        data,
        dateTime: new Date()
    }
}