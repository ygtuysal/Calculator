import {APIParams} from "../types";

const ALLOWED_VALUE_CHARS='01234567890+-*/.e'
const ALLOWED_KEY_CHARS='01234567890+-*/.=%'

type Expr = {value1: number|undefined, op: string|undefined, value2: number|undefined}

const NEGATE = '-/+'

export class CalculatorService {
    static async process(params: APIParams): Promise<string> {

        if (params.key === 'Escape' || params.key === 'C') {
            console.log('key= C/Escape - return 0')
            return '0'
        }

        const displayValue = CalculatorService.validateDisplayValue(params.displayValue)
        const key = CalculatorService.validateKey(params.key)
        console.log('displayValue=[',displayValue,'] key=[', key, ']')
        let {value1, op, value2} = CalculatorService.parseDisplayValue(displayValue)

        if (key === 'Escape' || key === 'C') {
            console.log('key= C/Escape - return 0')
            return '0'
        } else if (key === 'Enter' || key === '=') {
            console.log('key=Enter/= - return computeResult')
            return CalculatorService.computeResult({value1, op, value2})
        } else if (key === NEGATE) {
            console.log('key= -/+ - return negate')
            return CalculatorService.negateOp({value1, op, value2})
        } else if (key === '%') {
            console.log('key= % - return prc')
            return CalculatorService.prcOp({value1, op, value2})
        } else if (key >= '0' && key <= '9') {
            console.log('key=<digit> - return addDigit')
            return CalculatorService.addDigit(displayValue, key)
        } else if (key ==='.') {
            console.log('key= [.] - return addDot')
            return CalculatorService.addDot(displayValue)
        }else if (key === '+' || key === '-' || key === '*' || key === '/') {
            console.log('key=',key,' - return addOp')
            return CalculatorService.addOp({value1, op, value2}, key)
        }
        console.log('key is neither op nor digit - return same displayValue')
        return displayValue
    }

    static validateDisplayValue(displayValue: string) {
        displayValue = displayValue.trim()
        if (!displayValue) {
            displayValue = '0'
        }
        if (displayValue.length > 33) {
            console.error('expression too long')
            throw 'invalid_params'
        }

        for (let c of displayValue) {
            if (ALLOWED_VALUE_CHARS.indexOf(c) === -1) {
                console.error('invalid char [',c,']' )
                throw 'invalid_params'
            }
        }
        return displayValue
    }

    static validateKey(key: string) {
        if (!key) {
            console.error('key is blank')
            throw 'invalid_params'
        }
        key = key.trim()
        if (!key) {
            console.error('key is blank')
            throw 'invalid_params'
        }
        if (key === 'Enter' || key === 'Escape' || key === NEGATE || key==='C' ) {
            return key
        }
        if (key.length !== 1) {
            console.error('invalid key length')
            throw 'invalid_params'
        }
        if (ALLOWED_KEY_CHARS.indexOf(key) === -1) {
            console.error('invalid char [', key, ']')
            throw 'invalid_params'
        }
        return key
    }

    static parseDisplayValue(displayValue: string) {
        let op
        let value1 = undefined
        let value2 = undefined
        let seenDot = false
        for (let i=0; i<displayValue.length; i++) {
            const c = displayValue.charAt(i)
            if (c==='.') {
                seenDot = true
            }
            if (c==='*' || c==='/' || c=== '+' || c==='-' && i > 0) {
                const strValue1 = displayValue.substring(0, i)
                if (!CalculatorService.isNumeric(strValue1)) {
                    console.error('invalid value1 ', strValue1)
                    throw 'invalid_params'
                }
                if (seenDot) {
                    value1 = Number.parseFloat(strValue1)
                } else {
                    value1 = Number.parseInt(strValue1)
                }
                op = c
                const strValue2 = displayValue.substring(i + 1)
                if (strValue2.length) {
                    if (!CalculatorService.isNumeric(strValue2)) {
                        console.error('invalid value2 ', strValue2)
                        throw 'invalid_params'
                    }
                    if (strValue2.indexOf('.') === -1) {
                        value2 = parseInt(strValue2)
                    } else {
                        value2 = parseFloat(strValue2)
                    }
                }
                break
            }
        }
        if (value1 === undefined) {
            if (!CalculatorService.isNumeric(displayValue)) {
                console.error('invalid value1 ', displayValue)
                throw 'invalid_parameters'
            }
            if (displayValue.indexOf('.') !== -1) {
                value1 = Number.parseFloat(displayValue)
            } else {
                value1 = Number.parseInt(displayValue)
            }
        }
        return {value1, op, value2}
    }

    static isNumeric(str: string) {
        const d = Number.parseFloat(str)
        console.log('parseFload [', str, ']=[',d ,']' )
        return !Number.isNaN(d)
    }

    static computeResult( expr: Expr ) {
        if (expr.value1 != null && expr.op != null && expr.value2 != null) {
            let strValue2 = '' + expr.value2
            if (strValue2.startsWith('-')) {
                strValue2 = '(' + strValue2 + ')'
            }
            const strExpr = `${expr.value1}${expr.op}${strValue2}`
            let res: number
            try {
                res = eval(strExpr)
                return `${res}`
            } catch (err) {
                console.error(err)
            }
        }
        return CalculatorService.formatDisplayValue(expr)
    }

    static negateOp( expr: Expr ) {
        if (expr.value2 != null) {
            expr.value2 = -expr.value2
        } else if (expr.value1 != null) {
            expr.value1 = -expr.value1
        }
        return CalculatorService.formatDisplayValue(expr)
    }

    static prcOp( expr: Expr ) {
        if (expr.value2 != null) {
            expr.value2 = expr.value2 / 100
        } else if (expr.value1 != null) {
            expr.value1 = expr.value1 / 100
        }
        return CalculatorService.formatDisplayValue(expr)
    }



    static addDigit( displayValue: string, strDigit: string ) {
        if (displayValue === '0') {
            return strDigit
        }
        return displayValue + strDigit
    }

    static addDot( displayValue: string ) {
        if (displayValue.length === 0) {
            console.log('empty string - dont add dot')
            return displayValue
        }
        const c = displayValue[displayValue.length-1]
        if (c < '0' || c > '9') {
            console.log('displayValue does not end with digit - dont add dot')
            return displayValue
        }
        let lastValue = displayValue
        for(let i=displayValue.length-1; i>=0; i--) {
            const c = displayValue[i]
            if ('-+*/'.indexOf(c) >= 0) {
                lastValue = displayValue.substring(i+1)
            }
        }
        if (lastValue.indexOf('.') >= 0) {
            return displayValue
        }
        return displayValue + '.'
    }


    static addOp( expr: Expr, key: string ) {
        expr.op = key
        return CalculatorService.formatDisplayValue(expr)
    }

    static formatDisplayValue(expr: Expr) {
        return `${expr.value1 ?? ''}${expr.op || ''}${expr.value2 ?? ''}`
    }

}