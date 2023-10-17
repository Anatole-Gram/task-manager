

//Праверить валидность формы перед отправкой (states - массив ссылок на вычисляемые свойства реализующих проверку и возвращающих: true || false)
export const useFormInspector = (...states) => () => {
        const result = states.reduce((accum, current) => accum.add(Boolean(current.value)), new Set())
        return !result.has(false)
    }

//Праверить строку на минимальное (limit) кол-во символов (без учёта пробелов)
export const useCheckToMinLength = (str, limit) => str.replace(/\s/g, '').length < limit?false:true;


//редактировать номер телефона
export const useFoneNumberEditor = str => {
    const expPhone = /^(?<start>(\+?7)|8)?(?<first>\d{3})(?<second>\d{3})(?<third>\d{2})(?<fourth>\d{2})$/;
    let phone = str.replace(/\s/g,'')
    if (expPhone.test(phone)) return phone.replace(expPhone, '+7 $<first> $<second> $<third> $<fourth>')
    else return false
}



