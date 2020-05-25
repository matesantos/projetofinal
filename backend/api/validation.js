module.exports = app => {
    const existsOrError = (value, msg) => {
        if (!value) throw msg
        if (Array.isArray(value) && value.length === 0) throw msg
        if (typeof value === 'string' && !value.trim()) throw msg
    }

    const notExistsOrError = (value, msg) => {
        try{
            existsOrError(value, msg)
        }catch{
            return
        }
        throw msg
    }

    const equalsOrError = (valueA, valueB, msg) => {
        if ( valueA !== valueB ) throw msg
    }

    const isNumberOrError = (value, msg) => {
        if(isNaN(value)) throw msg
    }

    return { existsOrError, notExistsOrError, equalsOrError, isNumberOrError }
}