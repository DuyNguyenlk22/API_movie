export const responseData = (statusCode: number, message: string, content: any) => {
    return {
        statusCode,
        message,
        content,
        dateTime: new Date().toISOString()
    }
}