import { useState } from "react"

export const useForm = ( initialState = []) => {
    const [values, setValues] = useState(initialState)
    
    const reset = () => {
        setValues(initialState);
    }
    
    const handleInputChange = ({target}) => {
        setValues({
            ...values,
            [ target.name ]: target.value
        })
    }

    const handleInputFileChange = (target) => {
        const {name, files} = target;
        setValues({
            ...values,
            [ name ]: [...files]
        })
    }

    return [ values, handleInputChange, handleInputFileChange, reset ];


}